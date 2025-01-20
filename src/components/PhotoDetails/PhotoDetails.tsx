import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useFetchPhotoDetails from "../../apis/useFetchPhotoDetails";
import styled from "@emotion/styled";

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
  }
`;

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
    <ImageContainer>
      <BackButton onClick={() => router.back()}>Back</BackButton>
      <h2>{photo.alt}</h2>
      <Image src={photo.src.large} alt={photo.alt} width={800} height={800} />
      <p>
        Photographer: <a href={photo.photographer_url}>{photo.photographer}</a>
      </p>
    </ImageContainer>
  );
};

export default React.memo(PhotoDetails);
