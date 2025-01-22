import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import PhotoDetails from "../PhotoDetails";
import useFetchPhotoDetails from "../../../apis/useFetchPhotoDetails";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../apis/useFetchPhotoDetails");

describe("PhotoDetails", () => {
  const mockRouter = {
    query: { id: "1" },
    back: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders loading state", () => {
    (useFetchPhotoDetails as jest.Mock).mockReturnValue({
      photoDetails: null,
      loading: true,
      error: null,
    });

    render(<PhotoDetails />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useFetchPhotoDetails as jest.Mock).mockReturnValue({
      photoDetails: null,
      loading: false,
      error: "Error fetching photo details",
    });

    render(<PhotoDetails />);
    expect(
      screen.getByText("Error: Error fetching photo details")
    ).toBeInTheDocument();
  });

  it("renders no photo details available state", () => {
    (useFetchPhotoDetails as jest.Mock).mockReturnValue({
      photoDetails: null,
      loading: false,
      error: null,
    });

    render(<PhotoDetails />);
    expect(screen.getByText("No photo details available")).toBeInTheDocument();
  });

  it("renders photo details", () => {
    (useFetchPhotoDetails as jest.Mock).mockReturnValue({
      photoDetails: {
        alt: "Sample Photo",
        src: { large: "/sample-photo.jpg" },
        photographer: "John Doe",
        photographer_url: "http://example.com",
      },
      loading: false,
      error: null,
    });

    render(<PhotoDetails />);
    expect(screen.getByText("Sample Photo")).toBeInTheDocument();
    expect(screen.getByAltText("Sample Photo")).toBeInTheDocument();
    expect(screen.getByText("Photographer:")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("calls router.back when back button is clicked", () => {
    (useFetchPhotoDetails as jest.Mock).mockReturnValue({
      photoDetails: {
        alt: "Sample Photo",
        src: { large: "/sample-photo.jpg" },
        photographer: "John Doe",
        photographer_url: "http://example.com",
      },
      loading: false,
      error: null,
    });

    render(<PhotoDetails />);
    fireEvent.click(screen.getByText("Back"));
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
