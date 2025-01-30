import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Nav, Navbar, Row, Spinner } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useFavorites } from "../util/FavoritesContext";
import NavBar from "./NavBar";

export const API_BASE = "https://api.thecatapi.com/v1";
export const API_KEY = "live_2QgyB0VwThl4SBBEoAejBmbl6J4hzmW58yrQbSc6FsvNUNUeVwgLWQr75M2EOXFvY";

export type ImageResponse = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Array<any>;
};
const RandomCats = () => {
  const { randomCats, fetchCats, addFavorite, loading } = useFavorites();

  const navigate = useNavigate();

  useEffect(() => {
    if (randomCats.length <= 0) {
      fetchCats();
    }
  }, []);

  const viewDetails = (id) => {
    navigate(`/cat/${id}`);
  };

  return (
    <Container>
      <NavBar />
      <h1 className="text-center my-4">Random Cats</h1>
      <Row className="tm-mb-90 tm-gallery">
        {randomCats.map((cat, index) => (
          <Col xl={3} lg={4} md={6} sm={6} key={index} className="col-12 mb-5">
            <Card>
              <Card.Img key={index} src={cat.url} alt="Cat" onClick={() => viewDetails(cat.id)} />
              <Card.Body>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    addFavorite(cat.id);
                  }}
                  variant="secondary"
                >
                  Add to Favorites
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center my-4">
        <Button onClick={fetchCats} disabled={loading} variant="secondary">
          {loading ? <Spinner animation="border" size="sm" /> : "Load More"}
        </Button>
      </div>
      <Outlet />
    </Container>
  );
};

export default RandomCats;
