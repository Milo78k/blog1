import styles from "./TagList.module.scss";
import { v4 as uuidv4 } from "uuid";

const TagList = ({ tags }) => (
  <div className={styles.tagList}>
    {tags?.map((tag) => (
      <span key={uuidv4()} className={styles.tag}>
        {tag.length > 30 ? tag.slice(0, 30).trim() + "…" : tag}
      </span>
    ))}
  </div>
);

export default TagList;
