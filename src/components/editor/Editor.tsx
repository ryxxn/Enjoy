import { useMemo, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import './style.scss';
import ReactQuill from 'react-quill';
import EditorToolbar, { formats } from './EditorToolbar';
import { EditorProps } from './types';
import { onEditorImageUpload } from './imageUpload';
import EditorView from './EditorView';

export default function Editor({
  id = 'minimal-quill',
  value,
  onChange,
  simple = false,
  placeholder = '',
  readonly = false,
}: EditorProps | any) {
  const quillRef = useRef(null);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: `#${id}`,
        handlers: {
          image: () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.addEventListener('change', (e: any) => {
              const files = e.target.files[0] as any;
              onEditorImageUpload(files, quillRef);
            });
            input.click();
          },
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      syntax: false,
      clipboard: {
        matchVisual: false,
      },
    };
    // eslint-disable-next-line
  }, []);

  if (readonly) {
    return <EditorView value={value} />;
  }

  return (
    <div className='editorComponent'>
      <EditorToolbar id={id} isSimple={simple} />

      <ReactQuill
        ref={quillRef}
        theme={'snow'}
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
