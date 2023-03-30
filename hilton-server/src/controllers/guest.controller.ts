import {inject} from '@loopback/core';
import {FilterExcludingWhere, repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  requestBody,
  response,
} from '@loopback/rest';
import {
  // CredentialsRequestBody,
  JWTService,
  MyAuthBindings,
  Credential,
  PermissionKey,
} from '../authorization';
import {Guest} from '../models';
import {GuestRepository} from '../repositories';
import {CredentialsRequestBody} from './user.controller';

export class GuestController {
  constructor(
    @repository(GuestRepository)
    public guestRepository: GuestRepository,
    @inject(MyAuthBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) {}

  @post('/guests/signup')
  @response(200, {
    description: 'Guest model instance',
    content: {'application/json': {schema: getModelSchemaRef(Guest)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Guest, {
            title: 'NewGuest',
            exclude: ['id'],
          }),
        },
      },
    })
    guest: Omit<Guest, 'id'>,
  ): Promise<Guest> {
    guest.permissions = [
      PermissionKey.ViewOwnUser,
      PermissionKey.CreateUser,
      PermissionKey.UpdateOwnUser,
    ];
    return this.guestRepository.create(guest);
  }

  /**
   * user login
   * @param credentials email and password
   */
  @post('/guests/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {},
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credential: Credential,
  ): Promise<{token: string}> {
    const token = await this.jwtService.getToken(credential);
    return {token};
  }

  @get('/guests/{id}')
  @response(200, {
    description: 'Guest model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Guest, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Guest, {exclude: 'where'})
    filter?: FilterExcludingWhere<Guest>,
  ): Promise<Guest> {
    return this.guestRepository.findById(id, filter);
  }

  @patch('/guests/{id}')
  @response(204, {
    description: 'Guest PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Guest, {partial: true}),
        },
      },
    })
    guest: Guest,
  ): Promise<void> {
    await this.guestRepository.updateById(id, guest);
  }
}
