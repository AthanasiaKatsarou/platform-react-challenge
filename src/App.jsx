import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomCats from "./components/RandomCats";
import CatDetailModal from "./components/CatDetailModal";
import { FavoritesProvider } from "./util/FavoritesContext";
import FavoriteCats from "./components/FavoriteCats";
import CatBreedModal from "./components/CatBreedModal";
import BreedList from "./components/BreedList";

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RandomCats />} />

          <Route path="cat/:id" element={<CatDetailModal />} />

          <Route path="/list" element={<BreedList />} />

          <Route path="/breeds" element={<CatBreedModal />}>
            <Route path=":breedId" element={<CatDetailModal />} />
          </Route>

          <Route path="/favorites" element={<FavoriteCats />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
