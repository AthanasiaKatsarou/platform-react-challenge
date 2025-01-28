import React, { createContext, useContext, useState } from "react";
import { API_BASE, API_KEY, ImageResponse } from "../components/RandomCats";
import axios from "axios";

const FavoritesContext = createContext<any>([]);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState<ImageResponse[]>([]);
  console.log("favs", favorites);

  const getFavorites = async () => {
    try {
      const response = await axios.get(`${API_BASE}/favourites`, {
        headers: { "x-api-key": API_KEY },
      });
      setFavorites((prevCats) => [...prevCats, ...response.data]);
    } catch (error) {
      console.error("Error fetching cats with breeds:", error);
    }
  };

  // const addFavorite = async (id) => {
  //   if (!favorites.includes(id)) {
  //     try {
  //       const response = await axios.post(
  //         `${API_BASE}/favourites`,
  //         { image_id: id },
  //         {
  //           headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
  //         }
  //       );

  //       console.log("Favorite added:", response.data); // Debugging the response
  //       setFavorites([...favorites, id]); // Update state only after successful API call
  //     } catch (error) {
  //       console.error("Error adding favorite:", error.response ? error.response.data : error.message);
  //     }
  //   }
  // };
  const addFavorite = async (id) => {
    if (!favorites.includes(id)) {
      // try {
      //   const response = await fetch(`${API_BASE}/favourites`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-api-key": API_KEY,
      //     },
      //     body: JSON.stringify({ image_id: id }),
      //   });

      //   if (!response.ok) {
      //     const errorData = await response.json();
      //     throw new Error(`Error: ${response.status} - ${errorData.message}`);
      //   }

      //   const data = await response.json();
      //   console.log("Favorite added successfully:", data);

      setFavorites([...favorites, id]);
      // } catch (error) {
      //   console.error("Error adding favorite:", error.message);
      // }
    }
  };

  const removeFavorite = async (id) => {
    // try {
    //   const response = await fetch(`${API_BASE}/favourites/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //       "x-api-key": API_KEY,
    //     },
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(`Error: ${response.status} - ${errorData.message}`);
    //   }

    //   console.log(`Favorite with ID ${id} removed successfully.`);

    setFavorites(favorites.filter((fav) => fav !== id));
    // } catch (error) {
    //   console.error("Error removing favorite:", error.message);
    // }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, getFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the FavoritesContext
export const useFavorites = () => useContext(FavoritesContext);
