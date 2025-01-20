import { renderHook } from "@testing-library/react";
import useFetchPhotoDetails from "./useFetchPhotoDetails";

// TODO: Update the test
test("useFetchPhotoDetails", () => {
  const { result } = renderHook(() => useFetchPhotoDetails("1234"));
  expect(result.current).toBeDefined();
});
