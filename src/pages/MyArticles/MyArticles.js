import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "../../components/ArticleCard";
import { fetchArticles } from "../../store/articlesSlice";
import PaginationComponent from "../../components/PaginationComponent";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "../MyArticles/MyArticles.module.scss";

const MyArticles = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { list, page, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    if (currentUser?.username) {
      dispatch(
        fetchArticles({ page, authorQuery: `&author=${currentUser.username}` }),
      );
    }
  }, [dispatch, page, currentUser]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className={styles.error}>Ошибка: {error}</p>;
  if (list.length === 0)
    return <p className={styles.empty}>У вас пока нет статей.</p>;

  return (
    <div className={styles.articleContainer}>
      {list.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
      <PaginationComponent />
    </div>
  );
};

export default MyArticles;
