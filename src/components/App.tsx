import {useState, useEffect} from "react";
import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Homepage from "./Homepage";
import { chains } from "../chains/chains";
import { getPath } from "../utils/formatting";
import Chain from "./Chain";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";
import Validators from "./Validators";
import { coinGeckoApi } from "../services/coinGecko";
import { coinGeckoIds } from "../chains/chains";
import ICoin from "../models/ICoin";

function App() {


  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Homepage />} />
          <Route path="*" element={<NotFound />} />

          {chains.map(chain => {
            return <Route key={chain.chainId} path={getPath(chain)} element={<Chain chain={chain} />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="validators" element={<Validators />} />
            </Route>
          })}

        </Route>
      </Routes>
    </div>
  );
}

export default App;