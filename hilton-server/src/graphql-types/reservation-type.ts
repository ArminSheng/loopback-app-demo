import {field, inputType, objectType} from '@loopback/graphql';
import {Reservation} from '../models';

@inputType()
export class ReservationFilter implements Partial<Reservation> {
  @field(() => Date, {nullable: true})
  arrivalTime?: Date | undefined;

  @field(() => String, {nullable: true})
  status?: string | undefined;
}

@inputType()
export class ReservationInput implements Partial<Reservation> {
  @field(() => Date, {nullable: true})
  arrivalTime?: Date | undefined;

  @field(() => String, {nullable: true})
  guestName?: string | undefined;

  @field(() => String, {nullable: true})
  tableSize?: string | undefined;

  @field(() => String, {nullable: true})
  userId?: string | undefined;

  //   @field(() => String, {nullable: true})
  //   status?: string | undefined;
}

@inputType()
@objectType()
export class SimpleResult implements Partial<Reservation> {
  @field(() => Boolean)
  ok: boolean;

  @field(() => String, {nullable: true})
  message?: string;

  @field(() => String, {nullable: true})
  guestName?: string | undefined;
}
