import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {logInvocation} from '@loopback/logging';
import {property, repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import _ from 'lodash';
import {
  JWTService,
  AuthBindings,
  Credential,
  Roles,
  MyUserProfile,
  Admin_Secret,
  CredentialsSchema,
} from '../authorization';
import {Guest as Guest} from '../models';
import {GuestRepository} from '../repositories';

const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

class SignUpDTO extends Guest {
  @property({
    type: 'string',
  })
  adminSecret?: string;
}

export class UserController {
  constructor(
    @repository(GuestRepository)
    public userRepository: GuestRepository,
    @inject(AuthBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) {}

  @logInvocation()
  @post('/guests/signup')
  @response(200, {
    description: 'Guest model instance',
    content: {'application/json': {schema: getModelSchemaRef(SignUpDTO)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SignUpDTO, {
            title: 'NewGuest',
            exclude: ['id'],
          }),
        },
      },
    })
    guest: Omit<SignUpDTO, 'id'>,
  ): Promise<MyUserProfile & {token: string}> {
    const hasExist = await this.userRepository.findOne({
      where: {email: guest.email},
    });

    if (!!hasExist) {
      throw HttpErrors(`User with email ${guest.email} has Existed.`);
    }

    guest.role = guest.adminSecret === Admin_Secret ? Roles.ADMIN : Roles.GUEST;
    await this.userRepository.create(_.omit(guest, ['adminSecret']));
    const userProfile = await this.login({
      email: guest.email,
      password: guest.password,
    });

    return userProfile;
  }

  /**
   * user login
   * @param credentials email and password
   */
  @logInvocation()
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
  ): Promise<MyUserProfile & {token: string}> {
    const userProfile = await this.jwtService.getToken(credential);
    return userProfile;
  }

  @authenticate('jwt')
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
    @param.path.string('id') idOrMail: string,
    // @param.filter(Guest, {exclude: 'where'})
    // filter?: FilterExcludingWhere<Guest>,
  ): Promise<Guest | null> {
    return this.userRepository.findOne({
      where: {or: [{id: idOrMail}, {email: idOrMail}]},
    });
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
    await this.userRepository.updateById(id, guest);
  }
}
