import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Modal, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE, API_KEY } from "./RandomCats";
import NavBar from "./NavBar";

export type BreedResponse = {
  id: string;
  url: string;
  width: number;
  height: number;
};

const CatBreedModal = () => {
  const [breeds, setBreeds] = useState<BreedResponse[]>([]);
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
  const onClose = () => {
    navigate(-1);
  };

  return (
    <Modal show onHide={onClose} centered size="xl">
      <Modal.Header className="my-1 border-bottom-0" closeButton>
        <h2>{breedId}</h2>
      </Modal.Header>
      <Row className="mx-1">
        {breeds.map((breed) => (
          <Col xl={3} lg={4} md={6} sm={6} key={breed.id} className="col-12 mb-5">
            <Card onClick={() => viewDetails(breed.id)} className="favorite">
              <div className="gallery">
                <Card.Img key={breed.id} src={breed.url} alt="Cat" />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default CatBreedModal;
