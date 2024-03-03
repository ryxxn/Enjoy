import React from 'react';

const EditorView = ({
  value,
  className = '',
}: {
  value: string;
  className?: string;
}) => {
  return (
    <div
      className={`editorViewComponent ${className}`}
      dangerouslySetInnerHTML={{ __html: value }}
    ></div>
  );
};

export default EditorView;
