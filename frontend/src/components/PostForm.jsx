import React, { useRef, useState } from 'react';

const PostForm = ({ onCreate, disabled = false }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() && !image) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('text', text);
      if (image) formData.append('image', image);

      await onCreate(formData);
      setText('');
      setImage(null);
      setImagePreview('');
      if (fileRef.current) fileRef.current.value = '';
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card postform">
      <div className="card__header">
        <div>
          <h2 className="card__title">Create a post</h2>
          <p className="card__subtitle">Share text, an image, or both.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="postform__form">
        <textarea
          className="input input--textarea postform__textarea"
          placeholder="What’s on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled || loading}
          rows={4}
        />

        <div className="postform__row">
          <input
            ref={fileRef}
            className="input postform__file"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={disabled || loading}
          />
          <button className="btn btn--primary" type="submit" disabled={disabled || loading}>
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>

        {imagePreview ? (
          <div className="postform__preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        ) : null}
      </form>
    </section>
  );
};

export default PostForm;
