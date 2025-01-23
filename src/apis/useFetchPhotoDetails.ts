import { useState, useEffect, useCallback } from "react";
import { PEXELS_API, PEXELS_API_KEY } from "../config";
import { Photo } from "../interfaces";

const useFetchPhotoDetails = (photoId: string | undefined) => {
  const [photoDetails, setPhotoDetails] = useState<Photo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotoDetails = useCallback(async () => {
    if (!photoId) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${PEXELS_API}/v1/photos/${photoId}`, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch photo details");
      }

      const data: Photo = await response.json();
      // Tried caching the response but it didn't make any difference
      setPhotoDetails(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [photoId]);

  useEffect(() => {
    fetchPhotoDetails();
  }, [fetchPhotoDetails, photoId]);

  return { photoDetails, loading, error };
};

export default useFetchPhotoDetails;
