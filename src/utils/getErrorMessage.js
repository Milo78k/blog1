export const getErrorMessage = (
  error,
  fallback = "Не удалось выполнить запрос",
) => {
  const collect = (value, depth = 0) => {
    if (depth > 5 || value == null) return [];
    if (typeof value === "string") return value.trim() ? [value] : [];
    if (value instanceof Error) return collect(value.message, depth + 1);
    if (Array.isArray(value))
      return value.flatMap((item) => collect(item, depth + 1));
    if (typeof value === "object") {
      if (value.errors) return collect(value.errors, depth + 1);
      if (value.message) return collect(value.message, depth + 1);
      return Object.entries(value).flatMap(([field, messages]) =>
        collect(messages, depth + 1).map((message) => `${field}: ${message}`),
      );
    }
    return [];
  };
  return collect(error).join("; ") || fallback;
};
