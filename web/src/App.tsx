import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OtherPage from "./pages/OtherPage";
import "./App.css";
const App: React.FC = () => (
  <Router>
    {" "}
    <Routes>
      {" "}
      <Route path="/" element={<HomePage />} />{" "}
      <Route path="/other" element={<OtherPage />} />{" "}
    </Routes>{" "}
  </Router>
);
export default App;
