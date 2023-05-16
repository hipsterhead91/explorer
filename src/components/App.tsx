import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Homepage from "./Homepage";
import { chains } from "../chains/chains";
import { getPath } from "../utils/formatting";
import Chain from "./Chain";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";
import Validators from "./Validators";

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Homepage />} />
          <Route path="*" element={<NotFound />} />

          {chains.map(chain => {
            return <Route key={chain.chain} path={getPath(chain)} element={<Chain chain={chain} />}>
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