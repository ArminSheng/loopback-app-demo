import {field, ID, objectType} from '@loopback/graphql';
import {Entity, model, property} from '@loopback/repository';

@objectType({description: 'Object representing reservation'})
@model({settings: {strict: false}})
export class Reservation extends Entity {
  @field(() => ID)
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @field()
  @property({
    type: 'string',
    required: true,
  })
  guestName: string;

  @field()
  @property({
    type: 'string',
    required: true,
  })
  contactInfo: string;

  @field()
  @property({
    type: 'date',
    required: true,
  })
  arrivalTime: Date;

  @field({nullable: true})
  @property({
    type: 'string',
    default: 'md',
  })
  tableSize?: string;

  @field()
  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @field()
  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @field()
  @property({
    type: 'string',
    required: true,
  })
  guestId: string;

  constructor(data?: Partial<Reservation>) {
    super(data);
  }
}

export interface ReservationRelations {
  // describe navigational properties here
}

export type ReservationWithRelations = Reservation & ReservationRelations;
