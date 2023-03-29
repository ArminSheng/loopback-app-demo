import {inject} from '@loopback/core';
import {
  arg,
  authorized,
  GraphQLBindings,
  mutation,
  query,
  resolver,
  ResolverData,
  ResolverInterface,
} from '@loopback/graphql';
import {Filter, Null, NullType, repository} from '@loopback/repository';
import {
  ReservationFilter,
  ReservationInput,
  SimpleResult,
} from '../graphql-types/reservation-type';
import {Reservation} from '../models';
import {ReservationRepository} from '../repositories';

class OkRespnse {
  ok: boolean;
}

@resolver(() => Reservation)
export class ReservationResolver {
  constructor(
    // constructor injection of service
    @repository('ReservationRepository')
    private readonly reservationRepo: ReservationRepository,
    // @service(RecipeService) private readonly recipeService: RecipeService,
    // It's possible to inject the resolver data
    @inject(GraphQLBindings.RESOLVER_DATA) private resolverData: ResolverData,
  ) {}

  @query(() => [Reservation])
  @authorized('admin')
  async reservations(
    // @arg('filter') filter: Filter<Reservation>,
    @arg('filter', {nullable: true}) filter?: ReservationFilter,
  ): Promise<Reservation[]> {
    return this.reservationRepo.find({
      where: {
        status: filter?.status,
        arrivalTime: filter?.arrivalTime,
      },
    });
  }

  @mutation(() => SimpleResult)
  async updateReservation(
    @arg('id') id: string,
    @arg('reservation') reservation: ReservationInput,
  ): Promise<OkRespnse> {
    await this.reservationRepo.updateById(id, reservation);
    return {ok: true};
  }

  @mutation(() => Reservation)
  async makeReservation(
    @arg('reservation') reservation: ReservationInput,
  ): Promise<Reservation> {
    return this.reservationRepo.create(reservation);
    // return {ok: true};
  }

  @mutation(() => SimpleResult)
  async cancelReservation(@arg('id') id: string): Promise<SimpleResult> {
    await this.reservationRepo.cancelReservaiton(id);
    return {ok: true};
  }

  @authorized('admin')
  @mutation(() => SimpleResult)
  async markReservationAsCompleted(
    @arg('id') id: string,
  ): Promise<SimpleResult> {
    await this.reservationRepo.markReservAsCompleted(id);
    return {ok: true};
  }
}
