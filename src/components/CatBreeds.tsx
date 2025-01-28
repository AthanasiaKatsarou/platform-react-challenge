import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE, API_KEY } from "./RandomCats";

const CatBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const { breedId } = useParams();
  const navigate = useNavigate();
  console.log("cat", breedId);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(`${API_BASE}/images/search?limit=10&breed_ids=${breedId}`, {
          headers: { "x-api-key": API_KEY },
        });
        setBreeds(response.data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  const viewDetails = (id) => {
    navigate(`/cat/${id}`);
  };

  return (
    <Container>
      <h1 className="my-4">Cat Breeds</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {breeds.map((breed) => (
          <Col key={breed.id} className="m-2">
            <Button variant="link">
              <Card onClick={() => viewDetails(breed.id)}>
                <Card.Body>
                  <img key={breed.id} src={breed.url} alt="Cat" width={320} height={300} />
                </Card.Body>
              </Card>
            </Button>
          </Col>
        ))}
      </Row>
      <ListGroup></ListGroup>
    </Container>
  );
};

export default CatBreeds;
