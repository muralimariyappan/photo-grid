import { useState, useEffect } from "react";
import { PEXELS_API_KEY } from "../config";
import { Photo } from "../interfaces";

const useFetchPhotos = (query: string, page: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async (query: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=20`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
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
