import React, { useEffect, useState, useRef, useCallback } from "react";

import styled from "@emotion/styled";
import useFetchPhotos from "@/apis/useFetchPhotos";
import useVirtualScroll from "@/components/PhotoGrid/hooks/useVirtualScroll";
import PhotoGridItem from "@/components/PhotoGrid/components/PhotoGridItem";
import SearchComponent from "@/components/PhotoGrid/components/SearchComponent";
import { IMAGE_HEIGHT } from '@/components/PhotoGrid/constants';

const Container = styled.div`
  height: 70vh;
  overflow-y: auto;
  position: relative;
`;

interface GridProps {
  height: number;
  padding: number;
}

const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${IMAGE_HEIGHT}px, 1fr));
  overflow-y: scroll;
  align-content: start;
  height: ${(props) => props.height}px;
  padding-top: ${(props) => props.padding}px;
`;

const LoadMore = styled.div`
  .loading {
    text-align: center;
    padding: 16px;
    font-size: 1.2em;
  }
`;

const CenterText = styled.div`
  text-align: center;
  padding: 16px;
`;

const PhotoGrid: React.FC = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("nature");
  const { photos, loading } = useFetchPhotos(query, page);
  const loader = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement>(null!);

  const {
    photos: virtualizedPhotos,
    totalHeight,
    rowOffsetHeight,
    resetRowOffsetHeight,
    resetTotalHeight,
  } = useVirtualScroll(ref, photos);

  const onSearch = (query: string) => {
    setPage(1);
    setQuery(query);
    ref.current.scrollTo(0, 0);
    resetRowOffsetHeight();
    resetTotalHeight();
  };

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  // This can be included directly in the return function so react keeps track of the list and will update only the required changes
  // But, there was a weird bug where a particular image is repeated but it is not present in virtualizedPhotos
  // Only in the dom it appears.  I couldn't figure out the reason for this.
  // Because this re-renders the whole virutalized list on every change, it is not efficient
  const ImagesList = () => {
    return virtualizedPhotos.map((photo) => (
      <PhotoGridItem key={photo.id} photo={photo} />
    ));
  };

  return (
    <div>
      <SearchComponent onSearch={onSearch} placeholder={query} />
      {virtualizedPhotos.length === 0 && !loading && (
        <CenterText>No photos found!</CenterText>
      )}
      <Container ref={ref}>
        <Grid height={totalHeight} padding={rowOffsetHeight}>
          <ImagesList />
          <LoadMore ref={loader}>Loading...</LoadMore>
        </Grid>
      </Container>
    </div>
  );
};

export default PhotoGrid;
