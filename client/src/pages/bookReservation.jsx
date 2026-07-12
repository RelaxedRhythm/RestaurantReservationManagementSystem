import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function BookReservationPage() {
  const [formData, setFormData] = useState({ date: '', time: '', guestCount: 2 });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reservations', formData);
      setMessage('Reservation booked successfully.');
      navigate('/dashboard/reservations');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to book reservation');
    }
  };

  return (
    <div className="dashboard-card">
      <h2>Book a table</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        <input type="number" name="guestCount" min="1" max="10" value={formData.guestCount} onChange={handleChange} required />
        {message ? <p className="error-text">{message}</p> : null}
        <button type="submit" className="button primary">Reserve</button>
      </form>
    </div>
  );
}