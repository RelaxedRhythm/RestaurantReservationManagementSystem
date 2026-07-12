import { useEffect, useState } from "react";
import api from "../services/api";
import UpdateReservationModal from "../components/UpdateReservationModal";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalReservations: 0,
    activeReservations: 0,
    cancelledReservations: 0,
    totalTables: 0,
  });
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // const [editingReservation, setEditingReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, reservationsRes] = await Promise.all([
          api.get("/reservations/stats"),
          api.get("/reservations"),
        ]);

        setStats(statsRes.data);
        setReservations(reservationsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const refreshDashboard = async () => {
    try {
      const [statsRes, reservationsRes] = await Promise.all([
        api.get("/reservations/stats"),
        api.get("/reservations"),
      ]);

      setStats(statsRes.data);
      setReservations(reservationsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReservations = async (date = "") => {
    try {
      const url = date ? `/reservations/date/${date}` : "/reservations";

      const res = await api.get(url);
      setReservations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelReservation = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this reservation?",
    );

    if (!confirmCancel) return;

    try {
      await api.delete(`/reservations/${id}/cancel`);
      alert("Reservation cancelled successfully.");
      refreshDashboard();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow rounded-xl p-5">
          <h3>Total Reservations</h3>
          <p className="text-3xl font-bold">{stats.totalReservations}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3>Active</h3>
          <p className="text-3xl font-bold">{stats.activeReservations}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3>Cancelled</h3>
          <p className="text-3xl font-bold">{stats.cancelledReservations}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3>Tables</h3>
          <p className="text-3xl font-bold">{stats.totalTables}</p>
        </div>
      </div>

      {/* Reservations */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-2xl font-semibold mb-4">Reservations</h2>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            fetchReservations(e.target.value);
          }}
          className="border p-2 rounded-lg mb-5"
        />

        <button
          onClick={() => {
            setSelectedDate("");
            fetchReservations();
          }}
          className="ml-4 px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer"
        >
          Show All
        </button>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Time</th>
              <th className="text-left p-2">Guests</th>
              <th className="text-left p-2">Table</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id} className="border-b">
                <td className="p-3">{reservation.user?.name}</td>

                <td className="p-3">{reservation.user?.email}</td>

                <td className="p-3">
                  {new Date(reservation.date).toLocaleDateString()}
                </td>

                <td className="p-3">{reservation.time}</td>

                <td className="p-3">{reservation.guestCount}</td>

                <td className="p-3">{reservation.table?.number}</td>

                <td className="p-3">
                  <span
                    className={
                      reservation.status === "cancelled"
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {reservation.status}
                  </span>
                </td>
                <td classNAme=" p-3 flex gap-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
                    onClick={() => {
                      setSelectedReservation(reservation);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  {reservation.status !== "cancelled" && (
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                      onClick={() => cancelReservation(reservation._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <UpdateReservationModal
            reservation={selectedReservation}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedReservation(null);
            }}
            onSuccess={() => {
              setIsModalOpen(false);
              setSelectedReservation(null);
              refreshDashboard();
            }}
          />
        )}
      </div>
    </div>
  );
}
