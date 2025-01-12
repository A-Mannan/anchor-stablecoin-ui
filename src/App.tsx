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
import ManageRedemptionPage from "./pages/ManageRedemptionPage";
import LiquidatePositionPage from "./pages/LiquidatePositionPage";

const App: React.FC<{}> = () => {
  return (
    <>
      <Router>
        <div className="flex flex-col justify-center md:h-screen md:w-screen">
          <Layout />
          <Routes>
            <Route path="/" element={<Position />} />
            <Route path="/position" element={<UserPositions />} />
            <Route path="/earn" element={<Earn />} />
            <Route path="/earn/liquidation" element={<LiquidationPage />} />
            <Route path="/earn/liquidation/:id" element={<LiquidatePositionPage />} />
            <Route
              path="/earn/redemption-provider"
              element={<RedemptionProviderPage />}
            />
            <Route
              path="/earn/redemption-provider/manage"
              element={<ManageRedemptionPage />}
            />

            {/* <Route
              path="redemption-provider"
              element={<RedemptionProviderPage />}
            /> */}
            {/* </Route> */}
            <Route path="/docs" element={<></>} />
            <Route path="/auction" element={<DutchAuctionPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
