import { getErrorMessage } from "./getErrorMessage";
import articlesReducer, { fetchArticles } from "../store/articlesSlice";

test("normalizes nested API errors into renderable text", () => {
  expect(
    getErrorMessage({ errors: { body: ["is invalid", "is required"] } }),
  ).toBe("body: is invalid; body: is required");
  expect(getErrorMessage(new Error("offline"))).toBe("offline");
  expect(getErrorMessage(null)).toBe("Не удалось выполнить запрос");
});

test("rejected article loading stores a string instead of the API object", () => {
  const action = fetchArticles.rejected(
    null,
    "request",
    {},
    { errors: { server: ["Unavailable"] } },
  );
  const state = articlesReducer(undefined, action);
  expect(state.loading).toBe(false);
  expect(state.error).toBe("server: Unavailable");
});
