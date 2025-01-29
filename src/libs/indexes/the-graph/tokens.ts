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

export interface TokenHourData {
  periodStartUnix: string;
  priceUSD: string;
  token: {
    id: string;
  };
}

export interface TokensQueryResponse {
  tokens: TokenData[];
  currentHourDatas: TokenHourData[];
  dayOldTokenHourDatas: TokenHourData[];
}

export const getTokensQuery = gql`
  query getTokens(
    $contractAddresses: [String!]!
    $timestamp24hAgo: Int!
    $timestamp25hAgo: Int!
    $timestampHourAgo: Int!
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
    }
    currentHourDatas: tokenHourDatas(
      orderBy: periodStartUnix
      orderDirection: desc
      where: {
        token_in: $contractAddresses
        periodStartUnix_gte: $timestampHourAgo
      }
    ) {
      periodStartUnix
      priceUSD
      token {
        id
      }
    }
    dayOldTokenHourDatas: tokenHourDatas(
      orderBy: periodStartUnix
      orderDirection: desc
      where: {
        token_in: $contractAddresses
        periodStartUnix_lte: $timestamp24hAgo
        periodStartUnix_gte: $timestamp25hAgo
      }
    ) {
      periodStartUnix
      priceUSD
      token {
        id
      }
    }
  }
`;
