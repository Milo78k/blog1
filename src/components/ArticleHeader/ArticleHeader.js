import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import LikeButton from "../LikeButton";
import TagList from "../TagList";
import ArticleData from "../ArticleData";
import styles from "./ArticleHeader.module.scss";

const ArticleHeader = ({
  slug,
  title,
  favorited,
  favoritesCount,
  tagList,
  author,
  createdAt,
  isAuthor,
  onEdit = () => {},
  onDelete = null,
}) => {
  return (
    <div className={styles.articleHeader}>
      <div className={styles.top}>
        <Link to={`/articles/${slug}`} className={styles.title}>
          {title?.length > 50 ? title.slice(0, 50).trim() + "…" : title}
        </Link>
        <LikeButton
          slug={slug}
          favorited={favorited}
          favoritesCount={favoritesCount}
        />
      </div>

      <TagList tags={tagList} />
      <ArticleData article={{ author, createdAt }} />

      {isAuthor && (
        <div className={styles.actions}>
          {onDelete ? (
            <Popconfirm
              title="Are you sure to delete this article?"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
              placement="topRightBottom"
            >
              <button className={styles.deleteBtn}>Delete</button>
            </Popconfirm>
          ) : (
            <button className={styles.deleteBtn}>Delete</button>
          )}

          <button onClick={onEdit} className={styles.editBtn}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleHeader;
