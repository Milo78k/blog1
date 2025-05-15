import styles from "./TagList.module.scss";
import { v4 as uuidv4 } from "uuid";

const TagList = ({ tags }) => {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  const validTags = tags.filter(
    (tag) => typeof tag === "string" && tag.trim() !== ""
  );

  if (validTags.length === 0) return null;

  return (
    <div className={styles.tagList}>
      {validTags.map((tag) => (
        <span key={uuidv4()} className={styles.tag}>
          {tag.length > 30 ? tag.slice(0, 30).trim() + "…" : tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
