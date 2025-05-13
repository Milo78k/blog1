import styles from "./ArticleData.module.scss";

const ArticleData = ({ article }) => {
  if (!article || !article.author) return null;

  const { author, createdAt } = article;

  return (
    <div className={styles.articleSidebar}>
      <div className={styles.articleInfo}>
        <span className={styles.authorName}>{author.username}</span>
        <span className={styles.articleDate}>
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <img
        className={styles.articleAvatar}
        src={
          author.image ||
          "https://static.productionready.io/images/smiley-cyrus.jpg"
        }
        alt={author.username}
      />
    </div>
  );
};

export default ArticleData;
