import { gql } from 'graphql-request';

export interface TokenDayData {
  date: string;
  close: string;
  feesUSD: string;
  high: string;
  id: string;
  low: string;
  open: string;
  priceUSD: string;
  totalValueLocked: string;
  totalValueLockedUSD: string;
  untrackedVolumeUSD: string;
  volume: string;
  volumeUSD: string;
}

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
  tokenDayData?: TokenDayData[];
}

export interface TokensQueryResponse {
  tokens: TokenData[];
}

export const getTokensQuery = gql`
  query getTokens(
    $contractAddresses: [String!]!
    $startDate: Int
    $skipTokenDayData: Boolean!
  ) {
    tokens(where: { id_in: $contractAddresses }) {
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
      tokenDayData(orderDirection: asc, where: { date_gte: $startDate })
        @skip(if: $skipTokenDayData) {
        date
        close
        feesUSD
        high
        id
        low
        open
        priceUSD
        totalValueLocked
        totalValueLockedUSD
        untrackedVolumeUSD
        volume
        volumeUSD
      }
    }
  }
`;
