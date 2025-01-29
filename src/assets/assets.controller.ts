import { Controller, Get } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetDataDto } from './assets.dto';

@ApiTags('assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @ApiOperation({
    summary: 'Get all assets',
    description:
      'Retrieves a list of all available assets with their data from The Graph',
  })
  @ApiResponse({
    status: 200,
    description: 'List of assets retrieved successfully',
    type: AssetDataDto,
    isArray: true,
  })
  @Get()
  async getAssets(): Promise<AssetDataDto[]> {
    return await this.assetsService.getAssetsData();
  }
}
