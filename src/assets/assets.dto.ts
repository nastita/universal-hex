import { ApiProperty } from '@nestjs/swagger';

export class TokenDayDataDto {
  @ApiProperty({
    description: 'Date of the token data',
    example: '1706227200',
  })
  date: string;

  @ApiProperty({
    description: 'Closing price for the day',
    example: '0.345',
  })
  close: string;

  @ApiProperty({
    description: 'Total fees collected in USD',
    example: '1234.56',
  })
  feesUSD: string;

  @ApiProperty({
    description: 'Highest price for the day',
    example: '0.367',
  })
  high: string;

  @ApiProperty({
    description: 'Unique identifier',
    example: '0x12e96c2bfea6e835cf8dd38a5834fa61cf723736-1706227200',
  })
  id: string;

  @ApiProperty({
    description: 'Lowest price for the day',
    example: '0.332',
  })
  low: string;

  @ApiProperty({
    description: 'Opening price for the day',
    example: '0.340',
  })
  open: string;

  @ApiProperty({
    description: 'Current price in USD',
    example: '0.345',
  })
  priceUSD: string;

  @ApiProperty({
    description: 'Total value locked',
    example: '497889.871649120987730964',
  })
  totalValueLocked: string;

  @ApiProperty({
    description: 'Total value locked in USD',
    example: '171833.6927592904025798520789977834',
  })
  totalValueLockedUSD: string;

  @ApiProperty({
    description: 'Untracked volume in USD',
    example: '12345.67',
  })
  untrackedVolumeUSD: string;

  @ApiProperty({
    description: 'Trading volume',
    example: '15000.50',
  })
  volume: string;

  @ApiProperty({
    description: 'Trading volume in USD',
    example: '15000.50',
  })
  volumeUSD: string;
}

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

  @ApiProperty({
    description: 'Historical daily data for the token',
    type: [TokenDayDataDto],
    required: false,
  })
  tokenDayData?: TokenDayDataDto[];
}
