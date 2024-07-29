import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { EVENTS } from '../Events';

const Editorcomp = React.forwardRef(({ socketRef, roomId }, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setValue: (code) => {
      if (editorRef.current) {
        editorRef.current.setValue(code);
      }
    }
  }));

  useEffect(() => {
    async function init() {
      editorRef.current = window.CodeMirror.fromTextArea(document.getElementById('edit'), {
        mode: { name: 'javascript', json: true },
        theme: 'dracula',
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true
      });

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        if (origin !== 'setValue' && socketRef.current) {
          socketRef.current.emit(EVENTS.CODE_CHANGE, {
            roomId,
            code
          });
        }
      });
    }

    init();
  }, [socketRef, roomId]);

  return (
    <textarea id="edit"></textarea>
  );
});

export default Editorcomp;
