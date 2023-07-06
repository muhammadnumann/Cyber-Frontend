import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

function HtmlEditor({ placeholder, value = '', onChange, readonly = false }) {
  const editor = useRef(null);

  const config = {
    readonly, // all options from https://xdsoft.net/jodit/doc/,
    placeholder: placeholder || 'Start typings...',
    theme: localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light',
  };

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => onChange(newContent)} // preferred to use only this option to update the content for performance reasons
    />
  );
}
export default HtmlEditor;
