export type Reservation = {
  id?: string;
  guestName: string;
  contactInfo: string;
  status: string;
  tableSize?: string;
  arrivalTime?: string;
};

export enum Roles {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
}
