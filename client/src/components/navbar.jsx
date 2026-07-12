import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex flex-col md:flex-row md:justify-between md:items-center bg-white shadow px-4 py-4 gap-4">
      <div className="text-xl font-bold text-center md:text-left">Restaurant Reservation</div>
      <div className="flex flex-col md:flex-row items-center gap-3">
        {user.role === "admin" ? (
          <>
            <NavLink to="/admin">Dashboard</NavLink>
            <NavLink to="/admin/tables">Manage tables</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/dashboard">Home</NavLink>
            <NavLink to="/dashboard/book">Book</NavLink>
            <NavLink to="/dashboard/reservations">My reservations</NavLink>
          </>
        )}
        <button type="button" className="bg-red-600 text-white px-4 py-2 rounded-md w-full md:w-auto" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
