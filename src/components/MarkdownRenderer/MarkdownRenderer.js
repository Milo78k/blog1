import React from "react";
import Markdown from "markdown-to-jsx";

const MarkdownRenderer = ({ content }) => {
  return (
    <div>
      <Markdown>{content}</Markdown>
    </div>
  );
};

export default MarkdownRenderer;
