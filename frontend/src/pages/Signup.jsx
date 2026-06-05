import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await signup(name, email, password);
      navigate('/feed');
    } catch (err) {
      setError(err?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authpage">
      <div className="authcard">
        <h1>Create account</h1>
        <p>Join the feed and start posting right away.</p>

        <form onSubmit={handleSubmit} className="authform">
          <label>Name</label>
          <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <div className="alert alert--error">{error}</div> : null}

          <button className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Sign up'}
          </button>
        </form>

        <p className="authlink">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
