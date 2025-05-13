import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeArticle, unlikeArticle } from "../../store/articlesSlice";
import ArticleCard from "../../components/ArticleCard";
import { fetchArticles } from "../../store/articlesSlice";
import PaginationComponent from "../../components/PaginationComponent";
import LoadingSpinner from "../../components/LoadingSpinner";

import styles from "./ArticleList.module.scss";

const ArticleList = () => {
  const dispatch = useDispatch();
  const { list, page, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles({ page, authorQuery: "" }));
  }, [dispatch, page]);

  const handleLike = (slug, isLiked) => {
    if (isLiked) {
      dispatch(unlikeArticle(slug));
    } else {
      dispatch(likeArticle(slug));
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className={styles.error}>Ошибка: {error}</p>;
  if (list.length === 0)
    return <p className={styles.empty}>Статей пока нет.</p>;

  return (
    <div className={styles.articleContainer}>
      {list.map((article) => (
        <ArticleCard key={article.slug} article={article} onLike={handleLike} />
      ))}
      <PaginationComponent />
    </div>
  );
};

export default ArticleList;
