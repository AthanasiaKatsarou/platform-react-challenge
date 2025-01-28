import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomCats from "./components/RandomCats";
import CatDetailModal from "./components/CatDetailModal";
import { FavoritesProvider } from "./util/FavoritesContext";
import FavoriteCats from "./components/FavoriteCats";
import CatBreeds from "./components/CatBreeds";

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          {/* Main Page */}
          <Route path="/" element={<RandomCats />}>
            {/* Modal as a Nested Route */}
            <Route path="cat/:id" element={<CatDetailModal />} />
          </Route>
          {/* Cat Breeds View */}
          <Route path="/breeds" element={<CatBreeds />}>
            <Route path=":breedId" element={<CatDetailModal />} />
          </Route>

          {/* Favorite Cats View */}
          <Route path="/favorites" element={<FavoriteCats />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
