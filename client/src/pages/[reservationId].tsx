import { FormEvent, useCallback } from "react";
import useUser from "@/data/use-user";
import { Roles, useCreateUpdateReservation, useReservation } from "@/data";
import { CreateOrUpdateReservation } from "@/components/create-or-update";
import { GetServerSideProps } from "next/types";
import { useReservationManagement } from "@/data/use-reservations-management";

export default function Update({ reservationId }: Props) {
  const { user } = useUser({ redirectTo: "/login" });
  const { reservation } = useReservation(
    user,
    `filter={"where" : {"id": "${reservationId}"}}`
  );

  const { trigger: adminUpdate, reservation: adminReservation } =
    useReservationManagement(user, `id=${reservationId}`);

  const { trigger } = useCreateUpdateReservation(true);
  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const values = new FormData(e.target as HTMLFormElement).values();
      (user?.role === Roles.GUEST ? trigger : adminUpdate)({
        id: reservation?.id,
        guestName: values.next().value,
        contactInfo: values.next().value,
        arrivalTime: new Date(values.next().value + " " + values.next().value),
        tableSize: values.next().value,
        status: values.next().value || undefined,
      } as any);
    },
    [adminUpdate, reservation?.id, trigger, user?.role]
  );

  const onCancel = useCallback(() => {
    trigger({
      id: reservation?.id,
      status: "Cancelled",
    } as any);
  }, [reservation?.id, trigger]);

  return (
    <>
      <CreateOrUpdateReservation
        onSubmit={onSubmit}
        onCancel={onCancel}
        reservation={reservation || adminReservation || {}}
        title="My Reservation"
        submitText="Update"
        isAdmin={user?.role === Roles.ADMIN}
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
