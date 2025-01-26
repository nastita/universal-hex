import { Injectable } from '@nestjs/common';
import { request } from 'graphql-request';
import {
  AERODROME_BASE_FULL_SUBGRAPH_ID,
  createTheGraphSubgraphUrl,
} from '../libs/indexes/the-graph/constants';
import {
  createTokensQuery,
  TokenData,
  TokensQueryResponse,
} from '../libs/indexes/the-graph/tokens';
import { AssetsRepository } from '../libs/data/interfaces/assets.repository.interface';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../libs/logger/logger.service';

@Injectable()
export class AssetsService {
  constructor(
    private readonly logger: LoggerService,
    private readonly config: ConfigService,
    private readonly assetsRepository: AssetsRepository,
  ) {}

  async getAssets(): Promise<TokenData[]> {
    const apiKey = this.config.get<string>('THE_GRAPH_API_KEY')!; // Already validated in ConfigModule
    const assets = await this.assetsRepository.getAssets();
    const assetsAddresses = assets.map((asset) =>
      asset.contractAddress.toLocaleLowerCase(),
    );
    const url = createTheGraphSubgraphUrl(
      apiKey,
      AERODROME_BASE_FULL_SUBGRAPH_ID,
    );
    const query = createTokensQuery(assetsAddresses);

    this.logger.log(`Getting assets from The Graph: ${url}`);
    this.logger.log(`Query: ${query}`);

    const response = await request<TokensQueryResponse>(url, query);

    this.logger.log(`Got assets from The Graph: ${JSON.stringify(response)}`);

    return response?.tokens || [];
  }
}
