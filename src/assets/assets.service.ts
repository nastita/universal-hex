import { Injectable } from '@nestjs/common';
import { request } from 'graphql-request';
import {
  AERODROME_BASE_FULL_SUBGRAPH_ID,
  createTheGraphSubgraphUrl,
} from '../libs/indexes/the-graph/constants';
import {
  getTokensQuery,
  getTokenWith24hTokenHourDatasQuery,
  getTokenWithTokenDayDatasQuery,
} from '../libs/indexes/the-graph/tokens';
import { AssetsRepository } from '../libs/data/interfaces/assets.repository.interface';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../libs/logger/logger.service';
import {
  AssetDataWithPriceInfoDto,
  AssetWithPriceDataPoints,
} from './assets.dto';
import {
  TokensQueryResponse,
  TokenWithDailyPriceDataPointsResponse,
  TokenWithHourlyPriceDataPointsResponse,
} from '../libs/indexes/the-graph/types';

@Injectable()
export class AssetsService {
  private apiUrl: string;

  constructor(
    private readonly logger: LoggerService,
    private readonly config: ConfigService,
    private readonly assetsRepository: AssetsRepository,
  ) {
    this.apiUrl = createTheGraphSubgraphUrl(
      this.config.get<string>('THE_GRAPH_API_KEY')!, // Already validated in ConfigModule
      AERODROME_BASE_FULL_SUBGRAPH_ID,
    );
  }

  async getAssetsData(): Promise<AssetDataWithPriceInfoDto[]> {
    const assets = await this.assetsRepository.getAssets();
    const contractAddresses = assets.map((asset) =>
      asset.contractAddress.toLocaleLowerCase(),
    );
    const now = Math.floor(Date.now() / 1000);
    const timestampHourAgo = now - 3600;
    const timestamp24hAgo = now - 24 * 60 * 60;
    const timestamp25hAgo = now - 25 * 60 * 60;

    this.logger.debug(
      `Querying assets from The Graph for addresses: ${contractAddresses.join(', ')}`,
    );

    const response = await request<TokensQueryResponse>(
      this.apiUrl,
      getTokensQuery,
      {
        contractAddresses,
        timestampHourAgo,
        timestamp24hAgo,
        timestamp25hAgo,
      },
    );

    this.logger.debug(
      `Received response from The Graph: ${JSON.stringify(response)}`,
    );

    const { tokens, currentHourDatas, dayOldTokenHourDatas } = response;

    const assetsData = assets.map((asset) => {
      const token = tokens.find(
        (token) =>
          token.id.toLowerCase() === asset.contractAddress.toLowerCase(),
      );

      const currentTokenHourDataPrice = currentHourDatas.find(
        (tokenHourData) =>
          tokenHourData.token?.id.toLowerCase() ===
          asset.contractAddress.toLowerCase(),
      )?.priceUSD;

      const dayOldTokenHourDataPrice = dayOldTokenHourDatas.find(
        (tokenHourData) =>
          tokenHourData.token?.id.toLowerCase() ===
          asset.contractAddress.toLowerCase(),
      )?.priceUSD;

      if (!token || !currentTokenHourDataPrice || !dayOldTokenHourDataPrice) {
        return;
      }

      const assetData: AssetDataWithPriceInfoDto = {
        ...token,
        icon: asset.iconUrl ?? undefined,
        description: asset.description ?? undefined,
        links: asset.links,
        priceUSD: currentTokenHourDataPrice,
        priceChangePercentage24h: (
          ((parseFloat(currentTokenHourDataPrice) -
            parseFloat(dayOldTokenHourDataPrice)) /
            parseFloat(dayOldTokenHourDataPrice)) *
          100
        ).toString(),
      };

      return assetData;
    });

    return assetsData.filter((assetData) => assetData !== undefined);
  }

  async getAssetData(
    contractAddress: string,
    range: '24h' | '1w' | '1m' | '3m' | '6m' | '1y' = '24h',
  ): Promise<AssetWithPriceDataPoints | undefined> {
    if (range === '24h') {
      return await this.getAssetDataWith24hPriceDataPoints(contractAddress);
    }

    return await this.getAssetDataWithDailyPriceDataPoints(
      contractAddress,
      range,
    );
  }

  async getAssetDataWith24hPriceDataPoints(
    contractAddress: string,
  ): Promise<AssetWithPriceDataPoints | undefined> {
    const response = await request<TokenWithHourlyPriceDataPointsResponse>(
      this.apiUrl,
      getTokenWith24hTokenHourDatasQuery,
      {
        contractAddress: contractAddress.toLocaleLowerCase(),
      },
    );

    return {
      ...response.token,
      priceDataPoints: response.priceDataPoints.map((priceDataPoint) => ({
        timestamp: priceDataPoint.periodStartUnix,
        priceUSD: priceDataPoint.priceUSD,
      })),
    };
  }

  async getAssetDataWithDailyPriceDataPoints(
    contractAddress: string,
    range: '1w' | '1m' | '3m' | '6m' | '1y',
  ): Promise<AssetWithPriceDataPoints | undefined> {
    const daysInRange = {
      '1w': 7,
      '1m': 30,
      '3m': 90,
      '6m': 180,
      '1y': 365,
    };

    const numberOfDays: number = daysInRange[range];
    const response = await request<TokenWithDailyPriceDataPointsResponse>(
      this.apiUrl,
      getTokenWithTokenDayDatasQuery,
      {
        contractAddress: contractAddress.toLocaleLowerCase(),
        numberOfDays,
      },
    );

    return {
      ...response.token,
      priceDataPoints: response.priceDataPoints.map((priceDataPoint) => ({
        timestamp: priceDataPoint.date,
        priceUSD: priceDataPoint.priceUSD,
      })),
    };
  }
}
