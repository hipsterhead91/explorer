// Типизация
import ICoin from "../models/ICoin";

// Redux
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// Прочее
import { coinGeckoIds } from "../chains/chains";



/* Если я всё правильно понял, автоматически сгенерированный хук useFetchCoinsQuery, который мы будем вызывать в компонентах, требует как минимум один аргумент - например, для дополнительных query-параметров. При этом, нам этот аргумент может быть вообще не нужен, но указать его всё равно придётся, потому что ещё у хука есть второй необязательный аргумент - объект с дополнительными опциями, такими, как например pollingInterval, задающий интервал обновления данных. В результате, для обязательного первого аргумента необходимо указать тип в build.query<ICoin[], null> - в моём случае это null, хотя там могла быть и пустая строка, и что угодно ещё - главное в хук передать аргумент того же типа. Может я дурак и понял всё неправильно, но в любом случае без указания этого типа и без передачи соответствующего аргумента тайпскрипт ругается. */
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