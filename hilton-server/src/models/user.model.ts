import {field, ID, objectType} from '@loopback/graphql';
import {Entity, model, property, hasMany} from '@loopback/repository';
import {Reservation} from './reservation.model';

@objectType({description: 'Object representing user'})
@model()
export class User extends Entity {
  @field(() => ID)
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    id: true,
  })
  role: string;

  @field()
  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @field()
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  @field()
  password: string;

  @field({nullable: true})
  @property({
    type: 'string',
  })
  contact?: string;

  @field(() => [Reservation])
  @hasMany(() => Reservation)
  reservations: Reservation[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface GuestRelations {
  // describe navigational properties here
}

export type GuestWithRelations = User & GuestRelations;
