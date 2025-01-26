export interface TokenData {
  decimals: string;
  id: string;
  name: string;
  poolCount: string;
  symbol: string;
  totalSupply: string;
  totalValueLocked: string;
  totalValueLockedUSD: string;
  txCount: string;
  volume: string;
  volumeUSD: string;
}

export interface TokensQueryResponse {
  tokens: TokenData[];
}

export const createTokensQuery = (contractAddresses: string[]) => `{
  tokens(
    where: {
      id_in: ${JSON.stringify(contractAddresses)}
    }
  ) {
    decimals
    id
    name
    poolCount
    symbol
    totalSupply
    totalValueLocked
    totalValueLockedUSD
    txCount
    volume
    volumeUSD
  }
}`;
