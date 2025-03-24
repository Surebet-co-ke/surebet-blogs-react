import React, { useEffect, useRef } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange, placeholder }) => {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
    },
    placeholder,
  });

  const isInitialized = useRef(false);

  useEffect(() => {
    if (quill && !isInitialized.current) {
      isInitialized.current = true;
      
      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }

      quill.on('text-change', () => {
        onChange(quill.root.innerHTML);
      });

      setTimeout(() => {
        quill.focus();
      }, 100);
    }
  }, [quill, onChange, value]);

  return <div ref={quillRef} style={{ height: '300px', backgroundColor: 'white' }} />;
};

export default QuillEditor;