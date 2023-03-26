import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./ShowPage.css";

const ShowPage = () => {
  const [collectionData, setCollectionData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const response = await axios.get(
          `https://images-api.nasa.gov/search?nasa_id=${id}`
        );

        setCollectionData(response?.data?.collection?.items?.[0]?.data?.[0]);
        setSelectedImage(response?.data?.collection?.items?.[0]?.links?.[0]?.href)
      } catch (error) {
        console.error(error);
      }
    };

    fetchCollectionData();
  }, [id]);

  const renderImage = () => {
    return (
      <div className="image-container">
        {selectedImage && (
          <img src={selectedImage} alt={collectionData.title} />
        )}
      </div>
    );
  };

  const renderCollectionDetails = () => {
    if (!collectionData) {
      return null;
    }

    const { title, location, secondary_creator, description, keywords, date_created } =
      collectionData;

    return (
      <div className="details-container">
        <h2>{title}</h2>
        <p>{location}</p>
        <p>Creator: {secondary_creator}</p>
        <p>{description}</p>
        <p>Keywords: {keywords}</p>
        <p>Date Created: {date_created}</p>
      </div>
    );
  };

  return (
    <div className="container">
      <button onClick={() => navigate('/')}>&lt; Back to Search</button>
      {renderCollectionDetails()}
      {renderImage()}
    </div>
  );
};

export default ShowPage;
