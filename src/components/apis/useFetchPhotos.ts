import { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_PEXELS_API_KEY as string;

export interface Photo {
  id: string;
  src: {
    medium: string;
  };
  alt: string;
}

const useFetchPhotos = (query: string, page: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async (query: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}`,
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
      setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
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

  useEffect(() => {
    fetchPhotos(query, page);
  }, [query, page]);

  return { photos, loading, error };
};

export default useFetchPhotos;
