import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_BASE, API_KEY } from "./RandomCats";
import NavBar from "./NavBar";
import { BreedResponse } from "./CatBreedModal";
import { useFavorites } from "../util/FavoritesContext";

export type BreedListResponse = {
  id: string;
  name: string;
};

const BreedList = () => {
  const { breeds } = useFavorites();

  return (
    <Container>
      <NavBar />
      <h1 className="text-center my-4">A list of cat breeds</h1>
      <ListGroup>
        {breeds.map((breed) => (
          <ListGroup.Item key={breed.id} className="breeds">
            <Link to={`/breeds/${breed.id}`}>{breed.name}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default BreedList;
