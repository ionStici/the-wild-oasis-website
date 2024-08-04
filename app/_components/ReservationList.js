"use client";

import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";

export default function ReservationList({ bookings }) {
  // Optimistic UI
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  // the useOptimistic hook takes in two arguments: (1) the current state, (2) a state update function which will determine the next optimistic state.
  // The outputs are: (1) the optimistic data, (2) optimistic update function, similar to dispatch in useReducer

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
