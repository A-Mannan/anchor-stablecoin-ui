import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Position from "./pages/Position";
import Earn from "./pages/Earn";
import UserPositions from "./pages/UserPositionsTable";
import LiquidationPage from "./pages/Liquidations";
import DutchAuctionPage from "./pages/DutchAuction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RedemptionProviderPage from "./pages/RedemptionProvider";

const App: React.FC<{}> = () => {
  return (
    <>
      <Router>
        <Layout />
        <Routes>
          <Route path="/" element={<Position />} />
          <Route path="/position" element={<UserPositions />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/earn/liquidation" element={<LiquidationPage />} />
          <Route path="/earn/redemption-provider" element={<RedemptionProviderPage />} />
          
          {/* <Route
              path="redemption-provider"
              element={<RedemptionProviderPage />}
            /> */}
          {/* </Route> */}
          <Route path="/docs" element={<></>} />
          <Route path="/auction" element={<DutchAuctionPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
