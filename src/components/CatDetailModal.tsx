import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Card, Button, Modal } from "react-bootstrap";
import { API_BASE, API_KEY, ImageResponse } from "./RandomCats";
import { useFavorites } from "../util/FavoritesContext";

const CatDetailModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cat, setCat] = useState<ImageResponse>();
  const { addFavorite } = useFavorites();

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get(`${API_BASE}/images/${id}`, {
          headers: { "x-api-key": API_KEY },
        });
        setCat(response.data);
      } catch (error) {
        console.error("Error fetching cat details:", error);
      }
    };
    if (id) fetchCat();
  }, [id]);

  const onClose = () => {
    navigate(-1);
  };

  if (!cat) return <p>Loading...</p>;

  return (
    <Modal show onHide={onClose} centered>
      <Card className="favorite">
        <Card.Img variant="top" src={cat.url} alt="Cat" />
        <Card.Body>
          {cat.breeds && cat.breeds.length > 0 ? (
            cat.breeds.map((cat, index) => (
              <div key={index}>
                <Link to={"/list"}>Breed: {cat.name}</Link>
                <p>{cat.description}</p>
              </div>
            ))
          ) : (
            <p>No breed information available.</p>
          )}
          <div className={"d-flex justify-content-between"}>
            <Button onClick={onClose} variant="custom" className="custom">
              Back
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                addFavorite(cat.id);
                onClose();
              }}
              variant="custom"
              className="custom"
            >
              Add to Favorites
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Modal>
  );
};

export default CatDetailModal;
