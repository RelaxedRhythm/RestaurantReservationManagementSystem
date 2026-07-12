import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-card">
      <h1  className="text-4xl font-bold mb-4">Welcome, {user?.name || 'guest'}!</h1>
      <p>Reserve a table for your next visit in just a few steps.</p>
      <div className="card-actions">
        <Link className="button primary px-3 py-1 m-4 rounded-lg" to="/dashboard/book">Book a table</Link>
        <Link className="button px-3 py-1 m-4 rounded-lg bg-emerald-600 text-white" to="/dashboard/reservations">View reservations</Link>
      </div>
    </div>
  );
}