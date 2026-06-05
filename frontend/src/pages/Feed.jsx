import React, { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import ProtectedRoute from '../components/ProtectedRoute';

const Feed = () => {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/posts');
      setPosts(data.posts || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (formData) => {
    const { data } = await api.post('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setPosts((prev) => [data.post, ...prev]);
  };

  const handleLike = async (postId) => {
    const { data } = await api.put(`/posts/${postId}/like`);
    setPosts((prev) => prev.map((post) => (post.id === postId ? data.post : post)));
  };

  const handleComment = async (postId, commentText) => {
    const { data } = await api.post(`/posts/${postId}/comment`, { commentText });
    setPosts((prev) => prev.map((post) => (post.id === postId ? data.post : post)));
  };

  const sortedPosts = useMemo(() => posts, [posts]);

  return (
    <main className="container feedpage">
      <section className="hero">
        <div>
          <span className="pill">Public feed</span>
          <h1>Simple social posts with likes and comments.</h1>
          <p>
            Clean, responsive feed experience inspired by a lightweight social page.
          </p>
        </div>

        <div className="hero__card">
          <h3>Quick status</h3>
          <p>{isAuthenticated ? `Signed in as ${user?.name}` : 'Browse the feed and sign in to interact.'}</p>
        </div>
      </section>

      <ProtectedRoute
        fallback={
          <section className="card notice">
            <h2>Sign in to post</h2>
            <p>You can still view the public feed. Login to create posts, like posts, and comment.</p>
          </section>
        }
      >
        <PostForm onCreate={handleCreatePost} />
      </ProtectedRoute>

      {error ? <div className="alert alert--error">{error}</div> : null}

      <section className="feedlist">
        {loading ? (
          <div className="loadingstate">Loading posts...</div>
        ) : sortedPosts.length ? (
          sortedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={user}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))
        ) : (
          <div className="card notice">
            <h2>No posts yet</h2>
            <p>Be the first to create a post.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Feed;
