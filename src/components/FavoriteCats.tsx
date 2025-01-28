import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useFavorites } from "../util/FavoritesContext";
import { Link } from "react-router-dom";

const FavoriteCats = () => {
  const { favorites, getFavorites, removeFavorite } = useFavorites();
  // const favorites = getFavorites();

  return (
    <Container>
      <div>
        <Link to="/">Go Back</Link>
      </div>
      <h1 className="text-center my-4">Your Favorite Cats</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {favorites.map((id, index) => (
          <Col key={index}>
            <Card>
              <img src={`https://cdn2.thecatapi.com/images/${id}.jpg`} alt="Cat" width={"100%"} height={300} />
              <Card.Body>
                <Button onClick={() => removeFavorite(id)} variant="danger">
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoriteCats;
