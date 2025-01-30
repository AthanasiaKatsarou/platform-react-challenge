import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_BASE, API_KEY } from "./RandomCats";
import NavBar from "./NavBar";
import { BreedResponse } from "./CatBreedModal";

type BreedListResponse = {
  id: string;
  name: string;
};

const BreedList = () => {
  const [breeds, setBreeds] = useState<BreedListResponse[]>([]);

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

  return (
    <Container>
      <NavBar />
      <h1 className="my-4">A list of cat breeds</h1>
      <ListGroup>
        {breeds.map((breed) => (
          <ListGroup.Item key={breed.id}>
            <Link to={`/breeds/${breed.id}`}>{breed.name}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default BreedList;
