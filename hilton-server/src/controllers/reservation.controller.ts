import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {logInvocation} from '@loopback/logging';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Roles} from '../authorization';
import {Reservation} from '../models';
import {ReservationRepository} from '../repositories';

export class ReservationController {
  constructor(
    @repository(ReservationRepository)
    public reservationRepository: ReservationRepository,
  ) {}

  @logInvocation()
  @authenticate('jwt')
  @authorize({allowedRoles: [Roles.ADMIN]})
  @post('/reservations')
  @response(200, {
    description: 'Reservation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reservation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {
            title: 'NewReservation',
            exclude: ['id'],
          }),
        },
      },
    })
    reservation: Omit<Reservation, 'id'>,
  ): Promise<Reservation> {
    return this.reservationRepository.create(reservation);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: [Roles.ADMIN]})
  @get('/reservations')
  @response(200, {
    description: 'Array of Reservation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reservation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reservation) filter?: Filter<Reservation>,
  ): Promise<Reservation[]> {
    return this.reservationRepository.find(filter);
  }

  @logInvocation()
  @authenticate('jwt')
  @authorize({allowedRoles: [Roles.ADMIN]})
  @patch('/reservations')
  @response(200, {
    description: 'Reservation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {partial: true}),
        },
      },
    })
    reservation: Reservation,
    @param.where(Reservation) where?: Where<Reservation>,
  ): Promise<Count> {
    return this.reservationRepository.updateAll(reservation, where);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: [Roles.ADMIN]})
  @get('/reservations/{id}')
  @response(200, {
    description: 'Reservation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reservation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Reservation, {exclude: 'where'})
    filter?: FilterExcludingWhere<Reservation>,
  ): Promise<Reservation> {
    return this.reservationRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: [Roles.ADMIN]})
  @patch('/reservations/{id}')
  @response(204, {
    description: 'Reservation PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {partial: true}),
        },
      },
    })
    reservation: Reservation,
  ): Promise<void> {
    await this.reservationRepository.updateById(id, reservation);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: [Roles.ADMIN]})
  @del('/reservations/{id}')
  @response(204, {
    description: 'Reservation DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reservationRepository.deleteById(id);
  }
}
