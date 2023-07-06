import React from 'react';
import { Box } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

export default function MarkdownEditor({
  value = '',
  onChange,
  preview = 'edit',
}) {
  console.log(value);
  return (
    <Box
      data-color-mode={
        localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light'
      }
    >
      <MDEditor
        value={value}
        onChange={onChange}
        placeholder='Start Typing...'
        preview={preview} // live, edit, preview
        hideToolbar={false}
      />
      {preview === 'edit' && (
        <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
      )}
    </Box>
  );
}
