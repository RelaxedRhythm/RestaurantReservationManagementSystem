import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import api from '../services/api';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/users/login', formData);
      login(response.data);
      navigate(response.data.user?.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <p>Welcome back to the restaurant reservation system.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        {error ? <p className="error-text">{error}</p> : null}
        <button type="submit" className="button primary">Login</button>
      </form>
      <p className="switch-text">
        No account? <u><Link to="/register">Create one</Link> </u>
      </p>
    </div>
  );
};

export default LoginPage;
