import { useState } from "react";
import api from "../services/api";

export default function UpdateReservationModal({
  reservation,
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    date: reservation.date?.split("T")[0] || "",
    time: reservation.time || "",
    guests: reservation.guests || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const updateReservation = async () => {
    try {
      await api.put(`/reservations/${reservation._id}`, formData);

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-5">Update Reservation</h2>

        <label>Date</label>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <label>Time</label>

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <label>Guests</label>

        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">
            Cancel
          </button>

          <button
            onClick={updateReservation}
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
