import { useDispatch } from "react-redux";
import { likeArticle, unlikeArticle } from "../../store/articlesSlice";
import styles from "./LikeButton.module.scss";

const LikeButton = ({ slug, favorited, favoritesCount }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    if (favorited) {
      dispatch(unlikeArticle(slug));
    } else {
      dispatch(likeArticle(slug));
    }
  };

  return (
    <button
      className={`${styles.likeButton} ${favorited ? styles.liked : styles.unliked}`}
      onClick={handleLike}
    >
      {favorited ? "♥" : "♡"} {favoritesCount}
    </button>
  );
};

export default LikeButton;
