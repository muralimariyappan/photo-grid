import { useState, useEffect, useRef } from "react";
import { PEXELS_API_KEY } from "../config";
import { Photo } from "../interfaces";

const useFetchPhotos = (query: string, page: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cache = useRef<{ [key: string]: boolean }>({});

  const fetchPhotos = async (query: string, page: number) => {
    // Cache the API response to avoid making duplicate requests
    // useEffect only checks with the previous value of query and page
    const cacheKey = `${query}-${page}`;
    if (cache.current[cacheKey]) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=50`,
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
      cache.current[cacheKey] = true;
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
