import { FormEvent, useCallback } from "react";
import useUser from "@/data/use-user";
import { useCreateUpdateReservation } from "@/data";
import { CreateOrUpdateReservation } from "@/components/create-or-update";

export default function Book() {
  const { user } = useUser();

  const { trigger } = useCreateUpdateReservation();
  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const values = new FormData(e.target as HTMLFormElement).values();
      trigger({
        guestName: values.next().value,
        contactInfo: values.next().value,
        arrivalTime: new Date(values.next().value + " " + values.next().value),
        tableSize: values.next().value,
        status: "Reserved",
      } as any);
    },
    [trigger]
  );
  return (
    <>
      <CreateOrUpdateReservation
        onSubmit={onSubmit}
        reservation={{ guestName: user?.username }}
        title="Book"
      />
    </>
  );
}
