import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://blog-platform.kata.academy/api/articles";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async ({ page = 1, authorQuery = "" }, { rejectWithValue }) => {
    const limit = 5;
    const offset = (page - 1) * limit;
    try {
      const response = await axios.get(
        `${API_URL}?limit=${limit}&offset=${offset}${authorQuery}`,
      );
      return { ...response.data, page };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const fetchArticleBySlug = createAsyncThunk(
  "articles/fetchArticleBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${slug}`);
      return response.data.article;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async ({ article, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_URL,
        { article },
        { headers: { Authorization: `Token ${token}` } },
      );
      return response.data.article;
    } catch (err) {
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  },
);

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async ({ slug, article, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/${slug}`,
        { article },
        { headers: { Authorization: `Token ${token}` } },
      );
      return response.data.article;
    } catch (err) {
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  },
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async ({ slug, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${slug}`, {
        headers: { Authorization: `Token ${token}` },
      });
      return slug;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const likeArticle = createAsyncThunk(
  "articles/likeArticle",
  async (slug, { getState, rejectWithValue }) => {
    const token = getState().user.currentUser.token;
    try {
      const response = await fetch(
        `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to like article");
      const data = await response.json();
      return data.article;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const unlikeArticle = createAsyncThunk(
  "articles/unlikeArticle",
  async (slug, { getState, rejectWithValue }) => {
    const token = getState().user.currentUser.token;
    try {
      const response = await fetch(
        `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to unlike article");
      const data = await response.json();
      return data.article;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    list: [],
    article: null,
    total: 0,
    page: 1,
    loading: false,
    error: null,
    creationErrors: {},
  },
  reducers: {
    clearErrors(state) {
      return {
        ...state,
        creationErrors: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.articles;
        state.total = action.payload.articlesCount;
        state.page = action.payload.page;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.loading = true;
        state.article = null;
        state.error = null;
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.creationErrors = {};
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.creationErrors = action.payload;
      })
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
        state.creationErrors = {};
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
        state.list = state.list.map((a) =>
          a.slug === action.payload.slug ? action.payload : a,
        );
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.creationErrors = action.payload;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((a) => a.slug !== action.payload);
        state.article = null;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likeArticle.fulfilled, (state, action) => {
        const updated = action.payload;
        state.article = updated;
        state.list = state.list.map((a) =>
          a.slug === updated.slug ? updated : a,
        );
      })
      .addCase(unlikeArticle.fulfilled, (state, action) => {
        const updated = action.payload;
        state.article = updated;
        state.list = state.list.map((a) =>
          a.slug === updated.slug ? updated : a,
        );
      });
  },
});

export const { clearErrors } = articlesSlice.actions;
export default articlesSlice.reducer;
