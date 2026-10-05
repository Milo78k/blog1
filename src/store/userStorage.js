export const loadStoredUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && typeof user === "object" && typeof user.token === "string"
      ? user
      : null;
  } catch {
    return null;
  }
};

export const persistUser = (store) => (next) => (action) => {
  const previous = store.getState().user.currentUser;
  const result = next(action);
  const current = store.getState().user.currentUser;
  if (previous !== current) {
    try {
      if (current) localStorage.setItem("user", JSON.stringify(current));
      else localStorage.removeItem("user");
    } catch {
      // Storage may be unavailable; the current in-memory session still works.
    }
  }
  return result;
};
