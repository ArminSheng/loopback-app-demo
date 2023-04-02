import useSWRMutation from "swr/mutation";
import { fetcher } from "@/common";
import Router from "next/router";
import { Reservation } from "./types";

export function useCreateUpdateReservation(isUpdate?: boolean) {
  return useSWRMutation<{ data: any }>(
    "api/create-update-reservation",
    isUpdate ? patch : request,
    {
      onSuccess: () => {
        Router.push("/home");
      },
    }
  );
}

function request(url: string, { arg }: { arg: Reservation }) {
  return fetcher.post(url, { data: arg });
}

function patch(url: string, { arg }: { arg: Reservation }) {
  return fetcher.patch(`${url}?where={"id": "${arg.id}"}`, { data: arg });
}
