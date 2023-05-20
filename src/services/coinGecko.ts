import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import ICoin from "../models/ICoin";
import { coinGeckoIds } from "../chains/chains";

// Момент, который я не очень понял: build.query требует два типа - первый для получаемых данных (здесь это массив монет,
// и по нему вопросов нет), второй для дополнительного параметра, который можно указать в скобках для query: (). Но что,
// если мне не нужны никакие дополнительные параметры, как, например, в данном случае? Пропустить второй тип нельзя -
// тайпскрипт ругается. Пришлось указать null и далее, при вызове хука в компоненте, также передавать в него null - просто
// чтобы всё работало. Можно было бы указать string и передавать пустую строку, или заменить их чем-то ещё (лишь бы по 
// типам совпадало), это всё равно ни на что не влияет. Странная ситуация.
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