import { FormEvent, useCallback } from "react";
import useUser from "@/data/use-user";
import { useCreateUpdateReservation, useReservation } from "@/data";
import { CreateOrUpdateReservation } from "@/components/create-or-update";
import { GetServerSideProps } from "next/types";

export default function Update({ reservationId }: Props) {
  const { user } = useUser({ redirectTo: "/login" });
  const { reservation } = useReservation(
    user,
    `filter={"where" : {"id": "${reservationId}"}}`
  );

  const { trigger } = useCreateUpdateReservation(true);
  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const values = new FormData(e.target as HTMLFormElement).values();
      trigger({
        id: reservation?.id,
        guestName: values.next().value,
        contactInfo: values.next().value,
        arrivalTime: new Date(values.next().value + " " + values.next().value),
        tableSize: values.next().value,
        status: "Reserved",
      } as any);
    },
    [reservation?.id, trigger]
  );
  return (
    <>
      <CreateOrUpdateReservation
        onSubmit={onSubmit}
        reservation={reservation || {}}
        title="Update"
        submitText="Update"
      />
    </>
  );
}

type Props = { reservationId: string };

export const getServerSideProps: GetServerSideProps<Props, Props> = async ({
  params = { reservationId: "" },
}) => {
  return { props: { reservationId: params.reservationId } };
};
