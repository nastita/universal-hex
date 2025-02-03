import { gql } from '@urql/core';

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

export const getTokenWith24hTokenHourDatasQuery = gql`
  query getToken($contractAddress: String!) {
    token(id: $contractAddress) {
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
    priceDataPoints: tokenHourDatas(
      first: 24
      orderBy: periodStartUnix
      orderDirection: desc
      where: { token: $contractAddress }
    ) {
      periodStartUnix
      priceUSD
    }
  }
`;

export const getTokenWithTokenDayDatasQuery = gql`
  query getToken($contractAddress: String!, $numberOfDays: Int!) {
    token(id: $contractAddress) {
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
    currentPrice: tokenHourDatas(
      first: 1
      orderBy: periodStartUnix
      orderDirection: desc
      where: { token: $contractAddress }
    ) {
      periodStartUnix
      priceUSD
    }
    priceDataPoints: tokenDayDatas(
      first: $numberOfDays
      orderBy: date
      orderDirection: desc
      where: { token: $contractAddress }
    ) {
      date
      priceUSD
    }
  }
`;
