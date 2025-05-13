import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner";
import ArticleSummary from "../../components/ArticleSummary/ArticleSummary";
import { fetchArticleBySlug } from "../../store/articlesSlice";

const ArticlePage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { article, loading, error } = useSelector((s) => s.articles);

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug));
  }, [dispatch, slug]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Ошибка: {error}</p>;
  if (!article) return null;

  return <ArticleSummary article={article} variant="page" />;
};

export default ArticlePage;
