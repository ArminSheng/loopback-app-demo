import useSWR from "swr";
import { Reservation, User } from ".";

export function useReservation(user: User | undefined, query: string) {
  // We do a request to /api/events only if the user is logged in
  const { data: reservation } = useSWR<{ data: Reservation[] }>(
    user?.isLoggedIn ? `/api/create-update-reservation?${query}` : null
  );

  return { reservation: reservation?.data?.[0] };
}
