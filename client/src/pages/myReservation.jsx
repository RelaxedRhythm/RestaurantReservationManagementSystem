import { useEffect, useState } from "react";
import api from "../services/api";

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/reservations/my");
        setReservations(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this reservation?",
    );

    if (!confirmCancel) return;

    try {
      await api.delete(`/reservations/${id}/cancel`);

      // Remove the cancelled reservation from the UI
      setReservations((prev) =>
        prev.filter((reservation) => reservation._id !== id),
      );

      alert("Reservation cancelled successfully.");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to cancel reservation.");
    }
  };

  return (
    <div className="dashboard-card">
      <h2>My Reservations</h2>

      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <ul className="list-card">
          {reservations.map((reservation) => (
            <li
              key={reservation._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div>
                <strong>{reservation.date.split("T")[0]}</strong> at{" "}
                {new Date(`1970-01-01T${reservation.time}`).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  },
                )}{" "}
                for {reservation.guestCount} guests
              </div>

              <button
                onClick={() => handleCancel(reservation._id)}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
