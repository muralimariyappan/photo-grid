import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled'
import Image from "next/image";
import useFetchPhotos from '../apis/useFetchPhotos';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 16px;    
`;

const GridItem = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }    
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
    const { photos } = useFetchPhotos('nature', page);    
    const loader = useRef<HTMLDivElement | null>(null);        

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 0,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
    }, [handleObserver]);

    return (
        <Grid>
            {photos.map((photo) => (
                <GridItem key={photo.id}>
                    <Image src={photo.src.medium} alt={photo.alt} width={100} height={100}/>
                </GridItem>
            ))}
            <LoadingSpinner ref={loader}>Loading...</LoadingSpinner>
        </Grid>
    );
};

export default PhotoGrid;

