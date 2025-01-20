import { renderHook } from "@testing-library/react";
import useFetchPhotos from "./useFetchPhotos";

// TODO: Update the test
test("useFetchPhotos", () => {
  const { result } = renderHook(() => useFetchPhotos("nature", 1));
  expect(result.current).toBeDefined();
});
