import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Search from "./Search";
import Favourites from "./Favourites";
import Watched from "./Watched";
import About from "./components/About";

import "./App.css";

export default function App() {
  const [favourites, setFavourites] = useState([]);
  const [watched, setWatched] = useState([]);

  return (
    <Router>
      <Header />

      <Routes>
        {/* ✅ HOME */}
        <Route
          path="/"
          element={
            <Search
              setFavourites={setFavourites}
              setWatched={setWatched}
            />
          }
        />

        {/* ❤️ FAV */}
        <Route
          path="/favourites"
          element={<Favourites movies={favourites} />}
        />

        {/* 👁 WATCHED */}
        <Route
          path="/watched"
          element={<Watched movies={watched} />}
        />

        {/* ℹ ABOUT */}
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}