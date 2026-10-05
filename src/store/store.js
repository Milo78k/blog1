import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articlesSlice";
import userReducer from "./userSlice";
import { persistUser } from "./userStorage";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistUser),
  reducer: {
    articles: articlesReducer,
    user: userReducer,
  },
});
