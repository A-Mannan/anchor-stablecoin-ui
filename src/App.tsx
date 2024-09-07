import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Position from "./pages/Position";
import Earn from "./pages/Earn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC<{}> = () => {
  return (
    <>
      <Router>
        <Layout />
        <Routes>
          <Route path="/" element={<Position />} />
          <Route path="/position" element={<Position />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/docs" element={<Position />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
