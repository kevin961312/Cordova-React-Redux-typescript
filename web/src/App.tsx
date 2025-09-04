import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import { routes } from "./routes/routes";
import "./App.css";

const App: React.FC = () => {
  // Burger moved to HomePage; no menu state needed here now
  return (
    <Router>
      <Header />
      <Routes>
        {routes.map(r => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Routes>
    </Router>
  );
};
export default App;
