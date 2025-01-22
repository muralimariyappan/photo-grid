import React from "react";
import { render, screen } from "@testing-library/react";
import PhotoGrid from "../PhotoGrid";
import useFetchPhotos from "../../../apis/useFetchPhotos";
import useVirtualScroll from "../hooks/useVirtualScroll";

jest.mock("../../../apis/useFetchPhotos");
jest.mock("../hooks/useVirtualScroll");

describe("PhotoGrid", () => {
  it("should render photos correctly", () => {
    const mockPhotos = [
      {
        id: "1",
        src: { medium: "https://pexels.com/photo/photo1.jpg" },
        alt: "Photo 1",
      },
      {
        id: "2",
        src: { medium: "https://pexels.com/photo/photo2.jpg" },
        alt: "Photo 2",
      },
    ];
    (useFetchPhotos as jest.Mock).mockReturnValue({
      photos: mockPhotos,
      loading: false,
      error: null,
    });
    (useVirtualScroll as jest.Mock).mockReturnValue({
      photos: mockPhotos,
      totalHeight: 100,
      rowOffsetHeight: 10,
    });

    render(<PhotoGrid />);

    expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
    expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
  });

  it("should show loading text correctly", () => {
    (useFetchPhotos as jest.Mock).mockReturnValue({ photos: [] });

    render(<PhotoGrid />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
