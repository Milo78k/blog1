import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { createArticle, clearErrors } from "../../store/articlesSlice";
import { useHistory } from "react-router-dom";
import ArticleForm from "../ArticleForm";

export default function NewArticle() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser?.token;
  const creationErrors = useSelector((state) => state.articles.creationErrors);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleCreate = async (data) => {
    if (!token) {
      history.push("/sign-in");
      return;
    }

    try {
      const payload = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tags,
      };

      const actionResult = await dispatch(
        createArticle({ article: payload, token }),
      );
      unwrapResult(actionResult);

      history.push("/my-articles");
    } catch (err) {
      console.error("Ошибка создания статьи:", err);
    }
  };

  return (
    <ArticleForm onSubmitHandler={handleCreate} serverErrors={creationErrors} />
  );
}
