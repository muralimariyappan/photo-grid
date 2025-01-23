import { renderHook } from "@testing-library/react";
import useFetchPhotoDetails from "./useFetchPhotoDetails";

// More test cases need to be added
test("useFetchPhotoDetails", () => {
  const { result } = renderHook(() => useFetchPhotoDetails("1234"));
  expect(result.current).toBeDefined();
});
