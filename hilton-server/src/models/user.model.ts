import {field, ID, objectType} from '@loopback/graphql';
import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Reservation} from './reservation.model';
import {UserCredentials} from './user-credentials.model';

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

  @field()
  @property({
    type: 'string',
    required: true,
  })
  name: string;

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

  // @field()
  // @property({
  //   type: 'boolean',
  //   default: false,
  // })
  // isEmployee?: boolean;

  @field(() => [Reservation])
  @hasMany(() => Reservation)
  reservations: Reservation[];

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
