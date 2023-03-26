import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/search/SearchPage";
import ShowPage from "./pages/show/ShowPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={SearchPage} />
        <Route path="/show/:id" Component={ShowPage} />
      </Routes>
    </Router>
  );
};

export default App;
