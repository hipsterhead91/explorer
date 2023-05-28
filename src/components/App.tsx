// Пакеты
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";

// Компоненты
import Layout from "./Layout";
import Homepage from "./Homepage";
import NotFound from "./NotFound";
import Chain from "./Chain";
import Dashboard from "./Dashboard";
import Validators from "./Validators";
import Validator from "./Validator";
import Proposals from "./Proposals";

// Типизация
import ICoin from "../models/ICoin";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentChain } from "../store/reducers/currentChainSlice";

// API, сервисы
import { coinGeckoApi } from "../services/coinGecko";

// Прочее
import { chains } from "../chains/chains";



function App() {

  const currentChain = useAppSelector(selectCurrentChain);
  /* Можно задать интервал для автоматического обновления - идея хорошая и позже я её обязательно попробую, но сейчас API Coin Gecko почему-то плохо работает и иногда блокирует запросы, поэтому пока предпочёл не дёргать его лишний раз. */
  // const { data: coins } = coinGeckoApi.useFetchCoinsQuery(null, { pollingInterval: 30000 }); 
  const coinsData = coinGeckoApi.useFetchCoinsQuery(null).data;
  const [coins, setCoins] = useState<ICoin[] | null>(null);

  /* Поскольку coinsData может быть undefined в случае, если API не сработает, его нельзя передавать пропсом в элемент Chain. Точнее, наверно можно, если в интерфейса IChainProps добавить вариант undefined, но это вроде как противоречит идее тайпскрипта. Поэтому сделал так, с проверкой и транзитом через локальный стейт. */
  useEffect(() => {
    if (coinsData) setCoins(coinsData);
  }, [coinsData])

  // МЕНЯЕМ ИМЯ ВКЛАДКИ
  useEffect(() => {
    if (currentChain) document.title = `Oops!plorer | ${currentChain.chainId}`
    else document.title = "Oops!plorer";
  }, [currentChain])

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Homepage />} />
          <Route path="*" element={<NotFound />} />

          {chains.map(chain => {
            return <Route key={chain.chainId} path={chain.chainId} element={<Chain coins={coins} />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="validators" element={<Validators />} >
                <Route path=":valoper" element={<Validator />} />
              </Route>
              <Route path="proposals" element={<Proposals />} />
            </Route>
          })}

        </Route>
      </Routes>
    </div>
  );
}

export default App;