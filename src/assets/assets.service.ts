import { Injectable } from '@nestjs/common';
import { request } from 'graphql-request';
import {
  AERODROME_BASE_FULL_SUBGRAPH_ID,
  createTheGraphSubgraphUrl,
} from '../libs/indexes/the-graph/constants';
import {
  getTokensQuery,
  TokensQueryResponse,
} from '../libs/indexes/the-graph/tokens';
import { AssetsRepository } from '../libs/data/interfaces/assets.repository.interface';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../libs/logger/logger.service';
import { AssetDataDto } from './assets.dto';

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

  async getAssetsData(): Promise<AssetDataDto[]> {
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

      const assetData: AssetDataDto = {
        ...token,
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
}
