import React, { useEffect } from 'react';

const Editor = () => {
    useEffect(() => {
        if (window.CodeMirror) {
            window.CodeMirror.fromTextArea(document.getElementById('edit'), {
                mode: { name: 'javascript', json: true },
                theme: 'dracula', 
                lineNumbers: true,
                autoCloseTags:true,
                autoCloseBrackets:true
                
                 
            });
        } else {
            console.error('CodeMirror is not loaded');
        }
    }, []);

    return (
        <textarea id="edit"></textarea>
    );
};

export default Editor;
