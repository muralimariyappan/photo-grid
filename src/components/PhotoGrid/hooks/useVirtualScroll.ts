import { useEffect, useState } from "react";
import { Photo } from "@/interfaces";

interface UseVirtualScrollProps {
  ref: React.RefObject<HTMLDivElement>;
  inputPhotos: Photo[];
}

interface UseVirtualScrollReturn {
  photos: Photo[];
  totalHeight: number;
  rowOffsetHeight: number;
}

const useVirtualScroll = (
  ref: UseVirtualScrollProps["ref"],
  inputPhotos: UseVirtualScrollProps["inputPhotos"]
): UseVirtualScrollReturn => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [totalHeight, setTotalHeight] = useState<number>(500);
  const [rowOffsetHeight, setRowOffsetHeight] = useState<number>(0);
  const IMAGE_WIDTH = 216;
  const IMAGE_HEIGHT = 216;

  useEffect(() => {
    if (!ref.current) return;
    if (inputPhotos.length === 0) return;

    const getChildHeight = (): number => {
      return IMAGE_HEIGHT;
    };

    const getChildWidth = (): number => {
      return IMAGE_WIDTH;
    };

    const updatePhotos = (): void => {
      const scrollTop = ref.current?.scrollTop || 0;
      const numberOfColumns = Math.floor(
        ref.current?.clientWidth / getChildWidth()
      );
      const rowCount = Math.ceil(
        (ref.current?.clientHeight / getChildHeight()) * 2
      );
      const startIndex =
        Math.floor(scrollTop / getChildHeight()) * numberOfColumns;
      const endIndex = rowCount * numberOfColumns + startIndex;
      console.log("scrolling");
      console.log(scrollTop);
      console.log(numberOfColumns);
      console.log(startIndex, endIndex);
      setPhotos(inputPhotos.slice(startIndex, endIndex));
      setRowOffsetHeight(
        Math.floor(startIndex / numberOfColumns) * getChildHeight()
      );
    };

    const onScroll = (): void => {
      updatePhotos();
    };

    const updateHeight = (): void => {
      const numberOfColumns = Math.floor(
        ref.current?.clientWidth / getChildWidth()
      );
      const totalRows = Math.ceil(inputPhotos.length / numberOfColumns);

      setTotalHeight(totalRows * getChildHeight());
    };

    updatePhotos();
    updateHeight();

    ref.current.addEventListener("scroll", onScroll);

    return () => {
      ref.current?.removeEventListener("scroll", onScroll);
    };
  }, [ref, inputPhotos]);

  return { photos, totalHeight, rowOffsetHeight };
};

export default useVirtualScroll;
