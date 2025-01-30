import { ApiProperty } from '@nestjs/swagger';

export class AssetDataDto {
  @ApiProperty({
    description: 'Number of decimal places for the token',
    example: '18',
  })
  decimals: string;

  @ApiProperty({
    description: 'Contract address of the token',
    example: '0x12e96c2bfea6e835cf8dd38a5834fa61cf723736',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the token',
    example: 'Dogecoin (Universal)',
  })
  name: string;

  @ApiProperty({
    description: 'Number of liquidity pools containing this token',
    example: '0',
  })
  poolCount: string;

  @ApiProperty({
    description: 'Symbol of the token',
    example: 'uDOGE',
  })
  symbol: string;

  @ApiProperty({
    description: 'Total supply of the token',
    example: '3320841000000000000000',
  })
  totalSupply: string;

  @ApiProperty({
    description: 'Total amount of tokens locked in the protocol',
    example: '497889.871649120987730964',
  })
  totalValueLocked: string;

  @ApiProperty({
    description: 'Total value locked in USD',
    example: '171833.6927592904025798520789977834',
  })
  totalValueLockedUSD: string;

  @ApiProperty({
    description: 'Total number of transactions',
    example: '150',
  })
  txCount: string;

  @ApiProperty({
    description: 'Total trading volume',
    example: '1500000.50',
  })
  volume: string;

  @ApiProperty({
    description: 'Total trading volume in USD',
    example: '1500000.50',
  })
  volumeUSD: string;
}

export class AssetDataWithPriceChangeDto extends AssetDataDto {
  @ApiProperty({
    description: '24-hour price change percentage',
    example: '5.67',
  })
  priceChangePercentage24h: string;
}

export class PriceDataPoint {
  @ApiProperty({
    description: 'The timestamp for this data point',
    example: '1642809600',
  })
  timestamp: string;

  @ApiProperty({
    description: 'The price in USD for this data point',
    example: '0.324156',
  })
  priceUSD: string;
}

export class AssetWithPriceDataPoints extends AssetDataDto {
  @ApiProperty({
    description: 'Array of price data points for the asset',
    type: PriceDataPoint,
    isArray: true,
  })
  priceDataPoints: PriceDataPoint[];
}
