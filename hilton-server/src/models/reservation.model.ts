import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Reservation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  guestName: string;

  @property({
    type: 'string',
    required: true,
  })
  contactInfo: string;

  @property({
    type: 'date',
    required: true,
  })
  arrivalTime: string;

  @property({
    type: 'string',
    default: 'md',
  })
  tableSize?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Reservation>) {
    super(data);
  }
}

export interface ReservationRelations {
  // describe navigational properties here
}

export type ReservationWithRelations = Reservation & ReservationRelations;
