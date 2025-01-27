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
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: Number,
    description: 'Unix timestamp to start fetching token day data from',
  })
  @ApiResponse({
    status: 200,
    description: 'List of assets retrieved successfully',
    type: AssetDataDto,
    isArray: true,
  })
  @Get()
  async getAssets(
    @Query('startDate') startDate?: number,
  ): Promise<AssetDataDto[]> {
    return await this.assetsService.getAssetsData(startDate);
  }

  @ApiOperation({
    summary: 'Get asset by contract address',
    description: 'Retrieves data for a specific asset by its contract address',
  })
  @ApiParam({
    name: 'contractAddress',
    description: 'The contract address of the asset',
    example: '0x12e96c2bfea6e835cf8dd38a5834fa61cf723736',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: Number,
    description: 'Unix timestamp to start fetching token day data from',
  })
  @ApiResponse({
    status: 200,
    description: 'Asset data retrieved successfully',
    type: AssetDataDto,
  })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  @Get(':contractAddress')
  async getAsset(
    @Param('contractAddress') contractAddress: string,
    @Query('startDate') startDate?: number,
  ): Promise<AssetDataDto | null> {
    const asset = await this.assetsService.getAssetData(
      contractAddress,
      startDate,
    );

    if (!asset) throw new NotFoundException('Asset not found');

    return asset;
  }
}
