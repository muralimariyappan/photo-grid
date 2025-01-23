import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";
import { Photo } from "@/interfaces";
import React from "react";

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-height: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  img {
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: 200px;
  }
`;

interface PhotoGridItemProps {
  photo: Photo;
}

const PhotoGridItem: React.FC<PhotoGridItemProps> = ({ photo }) => {
  return (
    <Link href={`/photo/${photo.id}`} passHref>
      <GridItem key={photo.id}>
        <Image
          key={photo.id}
          src={photo.src.medium}
          alt={photo.alt}
          width={100}
          height={100}          
        />
      </GridItem>
    </Link>
  );
};

export default React.memo(PhotoGridItem);
