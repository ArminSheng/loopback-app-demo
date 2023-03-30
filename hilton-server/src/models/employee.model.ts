import {field, ID} from '@loopback/graphql';
import {Entity, model, property} from '@loopback/repository';
import {Guest, User} from '.';

@model()
export class Employee extends Entity {
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

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
