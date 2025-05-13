import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./ErrorMessage.module.scss";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function ErrorMessage({ errors }) {
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <ul className={styles.error}>
      {Object.entries(errors).map(([key, value]) => {
        const messages = Array.isArray(value) ? value : [value];
        return messages.map((msg, index) => (
          <li key={uuidv4()} className={styles.errorItem}>
            {capitalize(key)} {msg}
          </li>
        ));
      })}
    </ul>
  );
}
