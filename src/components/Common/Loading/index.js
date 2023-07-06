import React from 'react';
import { CircularProgress } from '@mui/material';
import './style.css';

const Loading = () => {
  return (
    <div className='loader-container'>
      <CircularProgress size={80} />
    </div>
  );
};

export default Loading;
