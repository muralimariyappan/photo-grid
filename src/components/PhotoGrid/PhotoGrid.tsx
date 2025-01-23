import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

import styled from "@emotion/styled";
import useFetchPhotos from "@/apis/useFetchPhotos";
import useVirtualScroll from "@/components/PhotoGrid/hooks/useVirtualScroll";
import PhotoGridItem from '@/components/PhotoGrid/components/PhotoGridItem';

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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  overflow-y: scroll;
  align-content: start;
  height: ${(props) => props.height}px;
  padding-top: ${(props) => props.padding}px;
`;

const LoadingSpinner = styled.div`
  .loading {
    text-align: center;
    padding: 16px;
    font-size: 1.2em;
  }
`;

const PhotoGrid: React.FC = () => {
  const [page, setPage] = useState(1);
  const { photos } = useFetchPhotos("nature", page);
  const loader = useRef<HTMLDivElement | null>(null);

  const memoizedPhotos = useMemo(() => photos, [photos]);
  const ref = useRef<HTMLDivElement>(null!);
  const {
    photos: virtualizedPhotos,
    totalHeight,
    rowOffsetHeight,    
  } = useVirtualScroll(ref, memoizedPhotos);

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

  return (
    <Container ref={ref}>
      <Grid height={totalHeight} padding={rowOffsetHeight}>
        {
          virtualizedPhotos.map((photo) => (
            <PhotoGridItem key={photo.id} photo={photo} />
          ))
        }                
        <LoadingSpinner ref={loader}>Loading...</LoadingSpinner>
      </Grid>
    </Container>
  );
};

export default PhotoGrid;
