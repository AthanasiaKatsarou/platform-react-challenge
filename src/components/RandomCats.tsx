import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useFavorites } from "../util/FavoritesContext";

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
  const [cats, setCats] = useState<ImageResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addFavorite } = useFavorites();

  const fetchCats = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/images/search?limit=10&has_breeds=1`, {
        headers: { "x-api-key": API_KEY },
      });
      setCats((prevCats) => [...prevCats, ...response.data]);
    } catch (error) {
      console.error("Error fetching cats with breeds:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const viewDetails = (id) => {
    navigate(`/cat/${id}`);
  };

  return (
    <Container>
      <div>
        <Link to="/favorites">Go to Favorites</Link>
      </div>
      <h1 className="text-center my-4">Random Cats</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {cats.map((cat, index) => (
          <Col key={index} className="m-2">
            <Button variant="link">
              <Card onClick={() => viewDetails(cat.id)}>
                <img key={index} src={cat.url} alt="Cat" width={320} height={300} />
                <Card.Body>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      addFavorite(cat.id);
                    }}
                  >
                    Add to Favorites
                  </Button>
                </Card.Body>
              </Card>
            </Button>
          </Col>
        ))}
      </Row>
      <div className="text-center my-4">
        <Button onClick={fetchCats} disabled={loading} variant="primary">
          {loading ? <Spinner animation="border" size="sm" /> : "Load More"}
        </Button>
      </div>
      <Outlet />
    </Container>
  );
};

export default RandomCats;
