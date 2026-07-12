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
      <h2 text-xl font-semibold mb-4>My Reservations</h2>

      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <ul className="list-card space-y-4">
          {reservations.map((reservation) => (
            <li
              key={reservation._id}
             className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <strong>{reservation.date.split("T")[0]}</strong> at{" "}
                {new Date(`1970-01-01T${reservation.time}`).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  }
                )}
                <br/>
                <span className="text-gray-600">
              {reservation.guestCount} guests
            </span>
              </div>

              <button
                onClick={() => handleCancel(reservation._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full sm:w-auto transition"
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
