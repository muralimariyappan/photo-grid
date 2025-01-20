import { useState, useEffect } from "react";
import { PEXELS_API_KEY } from "../config";

const BASE_URL = "https://api.pexels.com/v1/photos/";

interface PhotoDetails {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
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

const useFetchPhotoDetails = (photoId: string | undefined) => {
  const [photoDetails, setPhotoDetails] = useState<PhotoDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        if (photoId) {
          const response = await fetch(`${BASE_URL}${photoId}`, {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch photo details");
          }

          const data: PhotoDetails = await response.json();
          setPhotoDetails(data);
        }
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

    fetchPhotoDetails();
  }, [photoId]);

  return { photoDetails, loading, error };
};

export default useFetchPhotoDetails;
