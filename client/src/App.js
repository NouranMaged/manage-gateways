import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SingleGate from "./pages/SingleGate";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/single-gate/:id" element={<SingleGate />} />
      </Routes>
    </Router>
  );
};

export default App;
