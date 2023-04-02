import useSWR from "swr";
import { User } from ".";

export function useMyReservations(user: User | undefined) {
  // We do a request to /api/events only if the user is logged in
  const { data: reservations } = useSWR<{ data: any[] }>(
    user?.isLoggedIn ? `/api/my-reservations` : null
  );

  return { reservations: reservations?.data };
}
