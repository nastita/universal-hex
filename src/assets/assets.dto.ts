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
    description: 'Total number of transactions involving this token',
    example: '82251',
  })
  txCount: string;

  @ApiProperty({
    description: 'Total trading volume of the token',
    example: '120885944.839253248164506582',
  })
  volume: string;

  @ApiProperty({
    description: 'Total trading volume in USD',
    example: '42756462.6853263813307613775208913',
  })
  volumeUSD: string;
}
