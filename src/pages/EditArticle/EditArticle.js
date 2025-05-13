import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateArticle, clearErrors } from "../../store/articlesSlice";
import { useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import ArticleForm from "../../pages/ArticleForm";

export default function EditArticle() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser?.token;
  const article = useSelector((state) =>
    state.articles.list.find((a) => a.slug === slug),
  );
  const updateErrors = useSelector((state) => state.articles.updateErrors);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleUpdate = async (data) => {
    const payload = {
      slug,
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tags,
      },
      token,
    };

    const result = await dispatch(updateArticle(payload));
    if (updateArticle.fulfilled.match(result)) {
      history.push(`/articles/${slug}`);
    }
  };

  if (!article) return <LoadingSpinner />;

  return (
    <ArticleForm
      initialValues={article}
      onSubmitHandler={handleUpdate}
      serverErrors={updateErrors}
    />
  );
}
