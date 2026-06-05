import React, { useMemo, useState } from 'react';
import LikeButton from './LikeButton';
import CommentBox from './CommentBox';
import { formatDate } from '../utils/helpers';

const PostCard = ({ post, currentUser, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const isAuthenticated = !!currentUser;

  const liked = useMemo(() => {
    if (!currentUser || !post.likes) return false;
    return post.likes.some((like) => like.userId === currentUser.id);
  }, [currentUser, post.likes]);

  const handleLike = () => {
    onLike(post.id);
  };

  const handleComment = (commentText) => {
    return onComment(post.id, commentText);
  };

  return (
    <article className="card postcard">
      <div className="postcard__top">
        <div className="avatar">{post.username?.slice(0, 1).toUpperCase()}</div>
        <div className="postcard__meta">
          <h3>{post.username}</h3>
          <p>{formatDate(post.createdAt)}</p>
        </div>
      </div>

      {post.text ? <p className="postcard__text">{post.text}</p> : null}

      {post.imageUrl ? (
        <div className="postcard__imagewrap">
          <img className="postcard__image" src={post.imageUrl} alt="Post attachment" />
        </div>
      ) : null}

      <div className="postcard__stats">
        <span>{post.likeCount} likes</span>
        <span>{post.commentCount} comments</span>
      </div>

      <div className="postcard__actions">
        {isAuthenticated ? (
          <>
            <LikeButton liked={liked} likeCount={post.likeCount} onToggle={handleLike} />
            <button className="btn btn--ghost btn--sm" type="button" onClick={() => setShowComments((s) => !s)}>
              {showComments ? 'Hide comments' : 'Comments'}
            </button>
          </>
        ) : (
          <span className="muted">Login to like or comment</span>
        )}
      </div>

      <div className="postcard__names">
        {post.likes?.length ? (
          <div>
            <span className="postcard__label">Liked by:</span>
            <span className="postcard__name-list">
              {post.likes.map((like) => like.username).join(', ')}
            </span>
          </div>
        ) : null}
      </div>

      {showComments && isAuthenticated ? (
        <div className="postcard__comments">
          <CommentBox onSubmit={handleComment} />
          <div className="commentlist">
            {post.comments?.length ? (
              post.comments.map((comment) => (
                <div className="commentitem" key={comment.id}>
                  <div className="commentitem__head">
                    <strong>{comment.commenterUsername}</strong>
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                  <p>{comment.commentText}</p>
                </div>
              ))
            ) : (
              <p className="muted">No comments yet.</p>
            )}
          </div>
          {post.comments?.length ? (
            <div className="postcard__names">
              <span className="postcard__label">Commented by:</span>
              <span className="postcard__name-list">
                {Array.from(new Set(post.comments.map((comment) => comment.commenterUsername))).join(', ')}
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
};

export default PostCard;
