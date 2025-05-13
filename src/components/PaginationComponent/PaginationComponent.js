import React from "react";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../store/articlesSlice";

function PaginationComponent() {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.articles.page);
  const total = useSelector((state) => state.articles.total);

  const handlePageChange = (newPage) => {
    dispatch(fetchArticles({ page: newPage }));
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <Pagination
        current={current}
        total={total}
        pageSize={5}
        onChange={handlePageChange}
        showSizeChanger={false}
        showQuickJumper={false}
      />
    </div>
  );
}

export default PaginationComponent;
