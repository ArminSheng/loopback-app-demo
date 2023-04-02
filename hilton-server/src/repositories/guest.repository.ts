import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {ReservdbDataSource} from '../datasources';
import {User, GuestRelations, Reservation} from '../models';
import {ReservationRepository} from './reservation.repository';

export class GuestRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  GuestRelations
> {
  public readonly reservations: HasManyRepositoryFactory<
    Reservation,
    typeof User.prototype.id
  >;
  constructor(
    @inject('datasources.reservdb') dataSource: ReservdbDataSource,
    @repository.getter('ReservationRepository')
    protected reservationRepositoryGetter: Getter<ReservationRepository>,
  ) {
    super(User, dataSource);
    this.reservations = this.createHasManyRepositoryFactoryFor(
      'reservations',
      reservationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'reservations',
      this.reservations.inclusionResolver,
    );
  }
}
