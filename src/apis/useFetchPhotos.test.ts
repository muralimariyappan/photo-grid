import { renderHook } from "@testing-library/react";
import useFetchPhotos from "./useFetchPhotos";

// More test cases need to be added
test("useFetchPhotos", () => {
  const { result } = renderHook(() => useFetchPhotos("nature", 1));
  expect(result.current).toBeDefined();
});
