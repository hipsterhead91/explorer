// Общее
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
import Proposal from "./Proposal";

// Типизация
import ICoin from "../models/ICoin";

// Redux
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectCurrentChain } from "../store/reducers/currentChainSlice";
import { setCurrentLanguage } from "../store/reducers/currentLanguageSlice";
import { selectCurrentTheme, setCurrentTheme } from "../store/reducers/currentThemeSlice";

// API, сервисы
import { coinGeckoApi } from "../services/coinGecko";

// Прочее
import { chains } from "../chains/chains";



function App() {

  const currentChain = useAppSelector(selectCurrentChain);
  const currentTheme = useAppSelector(selectCurrentTheme);
  const localStoreTheme = localStorage.getItem("theme");
  const localStoreLanguage = localStorage.getItem("language");
  const coinGeckoData = coinGeckoApi.useFetchCoinsQuery(null, { pollingInterval: 60000 }).data;
  const [coinGeckoPrices, setCoinGeckoPrices] = useState<ICoin[] | null>(null);
  const dispatch = useAppDispatch();

  // СИНХРОНИЗИРУЕМ ЯЗЫК И ТЕМУ
  useEffect(() => {
    ((localStoreLanguage == "english") || (!localStoreLanguage))
      ? dispatch(setCurrentLanguage("english"))
      : dispatch(setCurrentLanguage("russian"));
    ((localStoreTheme == "light-theme") || (!localStoreTheme))
      ? dispatch(setCurrentTheme("light-theme"))
      : dispatch(setCurrentTheme("dark-theme"));
  }, [])

  /* Поскольку coinGeckoData может быть undefined в случае, если API не сработает, его нельзя напрямую передавать пропсом в компонент Dashboard. Точнее, наверно можно, если в интерфейсе IDashboardProps добавить вариант undefined, но это вроде как противоречит идее тайпскрипта. Поэтому сделал так, с проверкой и транзитом через локальный стейт. */
  useEffect(() => {
    (coinGeckoData)
      ? setCoinGeckoPrices(coinGeckoData)
      : setCoinGeckoPrices(null)
  }, [coinGeckoData])

  // МЕНЯЕМ ИМЯ ВКЛАДКИ
  useEffect(() => {
    if (!currentChain) document.title = "Oops!plorer"
    else document.title = `Oops!plorer | ${currentChain.chainId}`;
  }, [currentChain])

  return (
    <div className={`app ${currentTheme}`}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
          {chains.map(chain => {
            return <Route key={chain.chainId} path={chain.chainId} element={<Chain />}>
              <Route path="dashboard" element={<Dashboard coinGeckoPrices={coinGeckoPrices} />} />
              <Route path="validators" element={<Validators />} >
                <Route path=":valoper" element={<Validator />} />
              </Route>
              <Route path="proposals" element={<Proposals />} >
                <Route path=":id" element={<Proposal />} />
              </Route>
            </Route>
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default App;