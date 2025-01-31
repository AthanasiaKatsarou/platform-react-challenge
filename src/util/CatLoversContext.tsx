import React, { createContext, useContext, useEffect, useState } from "react";
import { API_BASE, API_KEY, ImageResponse } from "../components/RandomCats";
import axios from "axios";
import { BreedListResponse } from "../components/BreedList";

const CatLoversContext = createContext<any>([]);

export const CatLoversProvider = ({ children }) => {
  const [randomCats, setRandomCats] = useState<ImageResponse[]>([]);
  const [favorites, setFavorites] = useState<ImageResponse[]>([]);
  const [breeds, setBreeds] = useState<BreedListResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCats = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/images/search?limit=10&has_breeds=1`, {
        headers: { "x-api-key": API_KEY },
      });
      setRandomCats((prevCats) => [...prevCats, ...response.data]);
    } catch (error) {
      console.error("Error fetching cats with breeds:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(`${API_BASE}/breeds`, {
          headers: { "x-api-key": API_KEY },
        });
        setBreeds(response.data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };
    fetchBreeds();
  }, []);

  // const getFavorites = async () => {
  //   try {
  //     const response = await axios.get(`${API_BASE}/favourites`, {
  //       headers: { "x-api-key": API_KEY },
  //     });
  //     setFavorites((prevCats) => [...prevCats, ...response.data]);
  //   } catch (error) {
  //     console.error("Error fetching cats with breeds:", error);
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
    <CatLoversContext.Provider
      value={{ favorites, addFavorite, removeFavorite, randomCats, fetchCats, loading, breeds }}
    >
      {children}
    </CatLoversContext.Provider>
  );
};

export const useCatLovers = () => useContext(CatLoversContext);
