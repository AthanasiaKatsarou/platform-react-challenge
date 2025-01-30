import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useFavorites } from "../util/FavoritesContext";
import NavBar from "./NavBar";

const FavoriteCats = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <Container>
      <NavBar />
      <h1 className="text-center my-4">{favorites.length > 0 ? "Your Favorite Cats" : "No favorites yet!"}</h1>
      <Row className="tm-mb-90 tm-gallery">
        {favorites.map((id, index) => (
          <Col xl={3} lg={4} md={6} sm={6} key={index} className="col-12 mb-5">
            <Card className="favorite">
              <Card.Img key={index} src={`https://cdn2.thecatapi.com/images/${id}.jpg`} alt="Cat" />
              <Card.Body>
                <Button onClick={() => removeFavorite(id)} variant="custom" className="custom">
                  Remove from favorites
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
