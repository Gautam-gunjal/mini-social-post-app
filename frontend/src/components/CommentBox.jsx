import React, { useState } from 'react';

const CommentBox = ({ onSubmit, disabled = false }) => {
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setLoading(true);
      await onSubmit(commentText.trim());
      setCommentText('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="commentbox" onSubmit={handleSubmit}>
      <textarea
        className="input input--textarea"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows={2}
        disabled={disabled || loading}
      />
      <div className="commentbox__actions">
        <button className="btn btn--primary btn--sm" type="submit" disabled={disabled || loading}>
          {loading ? 'Posting...' : 'Comment'}
        </button>
      </div>
    </form>
  );
};

export default CommentBox;
