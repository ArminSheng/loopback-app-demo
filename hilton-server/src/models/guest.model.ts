import {field, ID, objectType} from '@loopback/graphql';
import {Entity, model, property, hasMany} from '@loopback/repository';
import {Reservation} from './reservation.model';

@objectType({description: 'Object representing user'})
@model()
export class Guest extends Entity {
  @field(() => ID)
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

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

  @property.array(String)
  permissions: String[];

  @field(() => [Reservation])
  @hasMany(() => Reservation)
  reservations: Reservation[];

  // @hasOne(() => UserCredentials)
  // userCredentials: UserCredentials;

  constructor(data?: Partial<Guest>) {
    super(data);
  }
}

export interface GuestRelations {
  // describe navigational properties here
}

export type GuestWithRelations = Guest & GuestRelations;
