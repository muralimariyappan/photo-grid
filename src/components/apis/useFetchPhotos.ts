import { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_PEXELS_API_KEY as string;
const BASE_URL = "https://api.pexels.com/v1/search";

export interface Photo {
  id: number;
  url: string;
  photographer: string;
  alt: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

const useFetchPhotos = (query: string, page: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${BASE_URL}?query=${query}&page=${page}`,
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }

        const data = await response.json();
        setPhotos([...photos, ...data.photos]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [query, page]);

  return { photos, loading, error };
};

export default useFetchPhotos;
