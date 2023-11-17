// Типизация
import ICoin from "../models/ICoin";

// Redux
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// Прочее
import { coinGeckoIds } from "../chains/chains";



export const coinGeckoApi = createApi({
  reducerPath: "coinGeckoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3" }),
  endpoints: (build) => ({
    fetchCoins: build.query<ICoin[], null>({
      query: () => ({
        url: `/coins/markets?vs_currency=usd&ids=${coinGeckoIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      })
    })
  })
});

export const { useFetchCoinsQuery } = coinGeckoApi;