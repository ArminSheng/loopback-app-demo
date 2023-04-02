import { fetcher } from "@/common";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Reservation, User } from ".";
import Router from "next/router";

export function useReservationManagement(user?: User, query?: string) {
  // We do a request to /api/events only if the user is logged in
  const { data: reservation } = useSWR<{ data: Reservation }>(
    user?.isLoggedIn ? `/api/reservations-management?${query}` : null,
    get
  );

  const { trigger } = useSWRMutation<{ data: any }>(
    `/api/reservations-management?${query}`,
    patch,
    {
      onSuccess: () => {
        Router.push("/home");
      },
    }
  );

  return { reservation: reservation?.data, trigger };
}

function get(url: string) {
  return fetcher.get(url);
}

function patch(url: string, { arg }: { arg: Reservation }) {
  return fetcher.patch(`${url}`, { data: arg });
}
