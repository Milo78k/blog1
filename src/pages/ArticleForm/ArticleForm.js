import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./ArticleForm.module.scss";

export default function ArticleForm({
  initialValues = {},
  onSubmitHandler,
  serverErrors = {},
  isSubmitting,
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialValues.title || "",
      description: initialValues.description || "",
      body: initialValues.body || "",
    },
  });

  const [tags, setTags] = useState(initialValues.tagList || []);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (serverErrors && Object.keys(serverErrors).length > 0) {
      Object.entries(serverErrors).forEach(([field, msg]) => {
        setError(field, {
          type: "server",
          message: Array.isArray(msg) ? msg[0] : msg,
        });
      });
    }
  }, [serverErrors, setError]);

  const onAddTag = () => {
    if (tagInput.trim()) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const onDeleteTag = (idx) => {
    setTags((prev) => prev.filter((_, i) => i !== idx));
  };

  const onSubmit = (data) => {
    onSubmitHandler({
      ...data,
      tags,
    });
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>
          {initialValues.title ? "Edit article" : "Create new article"}
        </h2>

        <label className={styles.label}>Title</label>
        <input
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
          className={`${styles.input} ${errors.title ? styles.error : ""}`}
        />
        {errors.title && (
          <p className={styles.errorText}>{errors.title.message}</p>
        )}

        <label className={styles.label}>Short description</label>
        <input
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
          className={`${styles.input} ${errors.description ? styles.error : ""}`}
        />
        {errors.description && (
          <p className={styles.errorText}>{errors.description.message}</p>
        )}

        <label className={styles.label}>Text</label>
        <textarea
          placeholder="Text"
          rows={6}
          {...register("body", { required: "Body is required" })}
          className={`${styles.textarea} ${errors.body ? styles.error : ""}`}
        />
        {errors.body && (
          <p className={styles.errorText}>{errors.body.message}</p>
        )}

        <label className={styles.label}>Tags</label>
        <div className={styles.tagsWrappper}>
          {tags.map((tag, idx) => (
            <div key={idx} className={styles.tagsRow}>
              <input
                type="text"
                value={tag}
                onChange={(e) => {
                  const updated = [...tags];
                  updated[idx] = e.target.value;
                  setTags(updated);
                }}
                className={styles.inputTag}
              />
              <button
                type="button"
                onClick={() => onDeleteTag(idx)}
                className={styles.deleteTagBtn}
              >
                Delete
              </button>
            </div>
          ))}

          <div className={styles.tagsRow}>
            <input
              type="text"
              placeholder="Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className={styles.inputTag}
            />
            <button
              type="button"
              onClick={onAddTag}
              className={styles.addTagBtn}
            >
              Add tag
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          Send
        </button>
      </form>
    </div>
  );
}
