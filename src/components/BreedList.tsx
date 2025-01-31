import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useCatLovers } from "../util/CatLoversContext";

export type BreedListResponse = {
  id: string;
  name: string;
};

const BreedList = () => {
  const { breeds } = useCatLovers();

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
