import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useFetchPhotoDetails from "../../apis/useFetchPhotoDetails";
import styled from "@emotion/styled";

const BackButton = styled.button`
    background-color: #333;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    `;

const PhotoDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    photoDetails: photo,
    loading,
    error,
  } = useFetchPhotoDetails(id as string);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!photo) {
    return <div>No photo details available</div>;
  }

  return (
    <div className="photo-details">
      <BackButton className="back-button" onClick={() => router.back()}>
        Back
      </BackButton>
      <h2>{photo.alt}</h2>
      <Image
        src={photo.src.large}
        alt={photo.alt}
        layout="responsive"
        width={800}
        height={600}
      />

      <p>
        Photographer: <a href={photo.photographer_url}>{photo.photographer}</a>
      </p>
    </div>
  );
};

export default PhotoDetails;
