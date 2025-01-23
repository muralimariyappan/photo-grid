import { useEffect, useState } from "react";
import { Photo } from "@/interfaces";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "@/components/PhotoGrid/constants";

interface UseVirtualScrollProps {
  ref: React.RefObject<HTMLDivElement>;
  inputPhotos: Photo[];
}

interface UseVirtualScrollReturn {
  photos: Photo[];
  totalHeight: number;
  rowOffsetHeight: number;
  resetTotalHeight: () => void;
  resetRowOffsetHeight: () => void;
}

const useVirtualScroll = (
  ref: UseVirtualScrollProps["ref"],
  inputPhotos: UseVirtualScrollProps["inputPhotos"]
): UseVirtualScrollReturn => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [totalHeight, setTotalHeight] = useState<number>(500);
  const [rowOffsetHeight, setRowOffsetHeight] = useState<number>(0);
  // Using fixed image size of 200x200 to keep the math simple
  // Any change in css to include padding or margin would require a change here

  const resetTotalHeight = (): void => {
    setTotalHeight(500);
  };

  const resetRowOffsetHeight = (): void => {
    setRowOffsetHeight(0);
  };

  useEffect(() => {
    if (!ref.current) return;

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
      setPhotos(inputPhotos.slice(startIndex, endIndex));
      // This is required to keep the scrollbar at the same position
      // There is tiny movement of scrollbar when this is set
      setRowOffsetHeight(
        Math.floor(startIndex / numberOfColumns) * getChildHeight() || 0
      );
    };

    // Can be rate limited but the frame would flicker if we scroll really fast using scrollbar
    const onScroll = (): void => {
      updatePhotos();
    };

    const updateHeight = (): void => {
      const numberOfColumns = Math.floor(
        ref.current?.clientWidth / getChildWidth()
      );
      const totalRows = Math.ceil(inputPhotos.length / numberOfColumns);

      setTotalHeight(totalRows * getChildHeight() || 0);
    };

    updatePhotos();
    updateHeight();

    ref.current.addEventListener("scroll", onScroll);

    return () => {
      // ref.current complains that it would have likely changed when this unmount happens
      // Added a null check, but probably needs a different approach
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current?.removeEventListener("scroll", onScroll);
    };
  }, [ref, inputPhotos]);

  return {
    photos,
    totalHeight,
    rowOffsetHeight,
    resetTotalHeight,
    resetRowOffsetHeight,
  };
};

export default useVirtualScroll;
