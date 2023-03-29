import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ReservdbDataSource} from '../datasources';
import {Reservation, ReservationRelations} from '../models';

export class ReservationRepository extends DefaultCrudRepository<
  Reservation,
  typeof Reservation.prototype.id,
  ReservationRelations
> {
  constructor(@inject('datasources.reservdb') dataSource: ReservdbDataSource) {
    super(Reservation, dataSource);
  }

  async cancelReservaiton(id: string): Promise<void> {
    return await this.updateById(id, {status: 'CANCELD'});
  }

  async markReservAsCompleted(id: string): Promise<void> {
    return await this.updateById(id, {status: 'COMPLETED'});
  }
}
