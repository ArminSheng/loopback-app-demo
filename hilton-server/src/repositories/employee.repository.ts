import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ReservdbDataSource} from '../datasources';
import {Employee, EmployeeRelations} from '../models';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {
  constructor(
    @inject('datasources.reservdb') dataSource: ReservdbDataSource,
  ) {
    super(Employee, dataSource);
  }
}
