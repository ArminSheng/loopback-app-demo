import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
  HasOneRepositoryFactory,
} from '@loopback/repository';
import {ReservdbDataSource} from '../datasources';
import {User, UserRelations, Reservation} from '../models';
import {UserCredentials} from '../models/user-credentials.model';
import {ReservationRepository} from './reservation.repository';
import {UserCredentialsRepository} from './user-credentials.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly reservations: HasManyRepositoryFactory<
    Reservation,
    typeof User.prototype.id
  >;
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.reservdb') dataSource: ReservdbDataSource,
    @repository.getter('ReservationRepository')
    protected reservationRepositoryGetter: Getter<ReservationRepository>,
    // @inject(`datasources.${UserServiceBindings.DATASOURCE_NAME}`)
    // dataSource: juggler.DataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
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

    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredentials',
      this.userCredentials.inclusionResolver,
    );
  }
}
