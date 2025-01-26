import { Controller, Get } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { TokenData } from '../libs/indexes/the-graph/tokens';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  async getAssets(): Promise<TokenData[]> {
    return await this.assetsService.getAssets();
  }
}
