import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Roles} from '../authorization';
import {Reservation, User} from '../models';
import {GuestRepository} from '../repositories';

export class UserReservationController {
  constructor(
    @repository(GuestRepository) protected userRepository: GuestRepository,
  ) {}

  @authenticate('jwt')
  @get('/users/{id}/reservations', {
    responses: {
      '200': {
        description: 'Array of User has many Reservation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reservation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Reservation>,
  ): Promise<Reservation[]> {
    return this.userRepository.reservations(id).find(filter);
  }

  @authenticate({
    strategy: 'jwt',
  })
  @authorize({allowedRoles: [Roles.GUEST]})
  @post('/users/{id}/reservations', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reservation)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {
            title: 'NewReservationInUser',
            exclude: ['id', 'guestId'],
            optional: [],
          }),
        },
      },
    })
    reservation: Omit<Reservation, 'id'>,
  ): Promise<Reservation> {
    return this.userRepository.reservations(id).create(reservation);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: [Roles.ADMIN, Roles.GUEST]})
  @patch('/users/{id}/reservations', {
    responses: {
      '200': {
        description: 'User.Reservation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {partial: true}),
        },
      },
    })
    reservation: Partial<Reservation>,
    @param.query.object('where', getWhereSchemaFor(Reservation))
    where?: Where<Reservation>,
  ): Promise<Count> {
    return this.userRepository.reservations(id).patch(reservation, where);
  }
}
