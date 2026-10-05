import { configureStore } from "@reduxjs/toolkit";
import userReducer, { updateUser, logout } from "./userSlice";
import { loadStoredUser, persistUser } from "./userStorage";

beforeEach(() => localStorage.clear());

test("corrupt persisted JSON does not prevent startup", () => {
  localStorage.setItem("user", "{invalid");
  expect(loadStoredUser()).toBeNull();
});

test("profile updates persist and logout removes the stored session", () => {
  const user = { username: "before", token: "test-token" };
  const store = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: { currentUser: user, token: null, errors: {} } },
    middleware: (defaults) => defaults().concat(persistUser),
  });
  store.dispatch(updateUser.fulfilled({ username: "after" }, "request", {}));
  expect(loadStoredUser()).toEqual({ username: "after", token: "test-token" });
  store.dispatch(logout());
  expect(localStorage.getItem("user")).toBeNull();
});
