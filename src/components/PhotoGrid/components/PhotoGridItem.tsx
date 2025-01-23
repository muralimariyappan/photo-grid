import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";
import { Photo } from "@/interfaces";
import React from "react";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '@/components/PhotoGrid/constants';

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-height: ${IMAGE_HEIGHT}px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  img {
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: ${IMAGE_HEIGHT}px;
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
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}          
        />
      </GridItem>
    </Link>
  );
};

export default React.memo(PhotoGridItem);
