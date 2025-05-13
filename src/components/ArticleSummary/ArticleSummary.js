import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle } from "../../store/articlesSlice";
import ArticleData from "../ArticleData";
import TagList from "../TagList";
import LikeButton from "../LikeButton";
import MarkdownRenderer from "../MarkdownRenderer";
import styles from "../../pages/ArticlePage/ArticlePage.module.scss";
import cardStyles from "../ArticleCard/ArticleCard.module.scss";

const ArticleSummary = ({ article, variant = "card" }) => {
  const {
    slug,
    title,
    description,
    body,
    author,
    createdAt,
    favorited,
    favoritesCount,
    tagList,
  } = article;

  const css = variant === "page" ? styles : cardStyles;
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector((s) => s.user);
  const token = currentUser?.token;
  const isAuthor = currentUser?.username === author.username;

  const handleDelete = () =>
    dispatch(deleteArticle({ slug, token })).then(() =>
      history.push("/articles"),
    );
  const handleEdit = () => history.push(`/articles/${slug}/edit`);

  return (
    <div className={variant === "page" ? css.articlePage : css.articleCard}>
      <div className={css.articleMain}>
        <div className={css.articleContent}>
          <div className={css.articleTop}>
            <Link to={`/articles/${slug}`} className={css.articleTitle}>
              {variant === "card" && title.length > 50
                ? title.slice(0, 50).trim() + "…"
                : title}
            </Link>
            <LikeButton
              slug={slug}
              favorited={favorited}
              favoritesCount={favoritesCount}
            />
          </div>

          <TagList tags={tagList} />
          {variant === "page" && (
            <div className={css.articleDescriptionText}>{description}</div>
          )}
        </div>

        <div className={css.articleMeta}>
          <ArticleData article={{ author, createdAt }} />
          {variant === "page" && isAuthor && (
            <div className={css.actions}>
              <Popconfirm
                title="Are you sure to delete this article?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
                placement="topRightBottom"
              >
                <button className={css.deleteBtn}>Delete</button>
              </Popconfirm>
              <button onClick={handleEdit} className={css.editBtn}>
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      {variant === "card" ? (
        <p className={css.articleDescription}>
          {description.length > 110
            ? description.slice(0, 110).trim() + "…"
            : description}
        </p>
      ) : (
        <div className={css.articleDescription}>
          <MarkdownRenderer content={body.replace(/\\n/g, "\n")} />
        </div>
      )}
    </div>
  );
};

export default ArticleSummary;
