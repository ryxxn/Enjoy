import React from 'react';

const EditorView = ({ value }: { value: string }) => {
  return (
    <div
      className='editorViewComponent'
      dangerouslySetInnerHTML={{ __html: value }}
    ></div>
  );
};

export default EditorView;
