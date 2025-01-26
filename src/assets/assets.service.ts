import { Injectable } from '@nestjs/common';
import { request } from 'graphql-request';
import {
  AERODROME_BASE_FULL_SUBGRAPH_ID,
  createTheGraphSubgraphUrl,
} from '../libs/indexes/the-graph/constants';
import {
  createTokensQuery,
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
    const assetsAddresses = assets.map((asset) =>
      asset.contractAddress.toLocaleLowerCase(),
    );
    const query = createTokensQuery(assetsAddresses);
    this.logger.debug(`Querying assets from The Graph, query: ${query}`);
    const response = await request<TokensQueryResponse>(this.apiUrl, query);

    return response?.tokens || [];
  }

  async getAssetData(contractAddress: string): Promise<AssetDataDto | null> {
    const response = await request<TokensQueryResponse>(
      this.apiUrl,
      createTokensQuery([contractAddress]),
    );

    return response?.tokens?.[0] || null;
  }
}
