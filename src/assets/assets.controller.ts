import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AssetDataDto,
  AssetDataWithPriceInfoDto,
  AssetDataExtrasDto,
} from './assets.dto';

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
  async getAssets(): Promise<AssetDataWithPriceInfoDto[]> {
    return await this.assetsService.getAssetsData();
  }

  // Usage assets?address=0xF1143f3A8D76f1Ca740d29D5671d365F66C44eD1&range=1d
  @Get(':address')
  @ApiOperation({
    summary: 'Get asset details',
    description: 'Retrieves detailed data for a specific asset',
  })
  @ApiParam({
    name: 'address',
    type: String,
    required: true,
    description: 'The contract address of the asset',
    example: '0xf1143f3a8d76f1ca740d29d5671d365f66c44ed1',
  })
  @ApiQuery({
    name: 'range',
    description: 'Time range for the asset data',
    example: '24h',
    enum: ['24h', '1w', '1m', '3m', '6m', '1y'],
    default: '24h',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Asset data retrieved successfully',
    type: AssetDataExtrasDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Asset not found',
  })
  async getAsset(
    @Param('address')
    address: string,
    @Query('range')
    range: '24h' | '1w' | '1m' | '3m' | '6m' | '1y' = '24h',
  ): Promise<AssetDataExtrasDto> {
    const assetData = await this.assetsService.getAssetData(address, range);
    if (!assetData) {
      throw new NotFoundException('Asset not found');
    }

    return assetData;
  }
}
