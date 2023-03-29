import {model, property} from '@loopback/repository';
import {User} from '.';

@model()
export class Employee extends User {
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
