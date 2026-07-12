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
    <nav className="navbar">
      <div className="brand">Restaurant Reservation</div>
      <div className="nav-links">
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
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
