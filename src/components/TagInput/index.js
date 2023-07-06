import React, { useEffect, useState } from 'react';
import './style.css';

export default function TagInput({ tagList, handleChange, theme }) {
  const [tags, setTags] = useState(tagList);
  const [newTag, setNewTag] = useState('');

  // for insert new tag
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      const newTags = [...tags, event.target.value];
      setTags(newTags);
      handleChange(newTags);
      setNewTag('');
    }
  };
  // for delete last tag
  const handleKeyDown = (event) => {
    if (event.keyCode === 8 && newTag === '') {
      const updatedTags = [...tags];
      updatedTags.pop();
      setTags(updatedTags);
      handleChange(updatedTags);
    }
  };
  // for delete selected tag
  const handleRemoveTag = (tagIndex) => {
    setTags(tags.filter((tag, index) => index !== tagIndex));
    handleChange(tags.filter((tag, index) => index !== tagIndex));
  };

  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

  return (
    <div className={theme === 'dark' ? 'tag-container dark' : 'tag-container'}>
      {tags.map((tag, index) => {
        const color = randomColor();
        return (
          <span
            key={index}
            className={theme === 'dark' ? 'tag-item dark' : 'tag-item'}
            style={{ borderColor: '#' + color, color: '#' + color }}
          >
            {tag}
            <span className='tag-remove' onClick={() => handleRemoveTag(index)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={16}
                height={16}
                viewBox='0 0 16 16'
                fill='none'
              >
                <g clipPath='url(#clip0_1424_358)'>
                  <path
                    d='M8.00004 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33334 8.00004 1.33334C4.31814 1.33334 1.33337 4.3181 1.33337 8C1.33337 11.6819 4.31814 14.6667 8.00004 14.6667Z'
                    stroke={'#' + color}
                    strokeWidth='1.33333'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10 6L6 10'
                    stroke={'#' + color}
                    strokeWidth='1.33333'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M6 6L10 10'
                    stroke={'#' + color}
                    strokeWidth='1.33333'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_1424_358'>
                    <rect width={16} height={16} fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </span>
        );
      })}
      <input
        type='text'
        value={newTag}
        className={theme === 'dark' ? 'tag-input dark' : 'tag-input'}
        onChange={(event) => setNewTag(event.target.value)}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
