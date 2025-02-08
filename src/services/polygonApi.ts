// services/polygonApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface StockData {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: {
    v: number;  // volume
    vw: number; // volume weighted average price
    o: number;  // open price
    c: number;  // close price
    h: number;  // high price
    l: number;  // low price
    t: number;  // timestamp
    n: number;  // number of transactions
  }[];
  status: string;
  request_id: string;
  count: number;
}

const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_POLYGON_API_URL;

export const polygonApi = createApi({
  reducerPath: 'polygonApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL || 'https://api.polygon.io/v2/',
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set('Authorization', `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStockData: builder.query<StockData, { symbol: string; startDate: string; endDate: string }>({
      query: ({ symbol, startDate, endDate }) => ({
        url: `aggs/ticker/${symbol}/range/1/day/${startDate}/${endDate}`,
        params: {
          apiKey: API_KEY,
        },
      }),
    }),
  }),
});

export const { useGetStockDataQuery } = polygonApi;