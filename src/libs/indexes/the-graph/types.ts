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

export interface PriceDataPoints {
  timestamp: string;
  priceUSD: string;
}

export interface HourlyPriceDataPoint {
  periodStartUnix: string;
  priceUSD: string;
}

export interface DailyPriceDataPoint {
  date: string;
  priceUSD: string;
}

export interface TokenWithPriceDataPoints {
  token: TokenData;
  priceDataPoints: PriceDataPoints[];
}

export interface TokenWithDailyPriceDataPointsResponse {
  token: TokenData;
  priceDataPoints: DailyPriceDataPoint[];
}

export interface TokenWithHourlyPriceDataPointsResponse {
  token: TokenData;
  priceDataPoints: HourlyPriceDataPoint[];
}
