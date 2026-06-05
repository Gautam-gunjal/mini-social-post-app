import React from 'react';

const LikeButton = ({ liked, likeCount, onToggle, disabled = false }) => {
  return (
    <button
      className={`likebtn ${liked ? 'likebtn--active' : ''}`}
      onClick={onToggle}
      disabled={disabled}
      type="button"
    >
      <span>{liked ? '♥' : '♡'}</span>
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;
