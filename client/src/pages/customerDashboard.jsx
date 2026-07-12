import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-card">
      <h1  className="text-4xl font-bold mb-4">Welcome, {user?.name || 'guest'}!</h1>
      <p className="text-gray-600 mb-6">Reserve a table for your next visit in just a few steps.</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-center transition" to="/dashboard/book">Book a table</Link>
        <Link className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg text-center transition" to="/dashboard/reservations">View reservations</Link>
      </div>
    </div>
  );
}