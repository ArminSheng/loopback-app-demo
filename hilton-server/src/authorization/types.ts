import {UserProfile} from '@loopback/security';
import {PermissionKey} from './permission-key';

export interface UserPermissionsFn {
  (
    userPermissions: PermissionKey[],
    requiredPermissions: RequiredPermissions,
  ): boolean;
}

export interface MyUserProfile extends UserProfile {
  id: string;
  email: string;
  username: string;
  // permissions: PermissionKey[];
  role: string;
}

export enum Roles {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

export interface RequiredPermissions {
  required: PermissionKey[];
}

export const UserProfileSchema = {
  type: 'object',
  required: ['email', 'password', 'name'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
    name: {type: 'string'},
  },
};

export const UserRequestBody = {
  description: 'The input of create user function',
  required: true,
  content: {
    'application/json': {schema: UserProfileSchema},
  },
};

export interface Credential {
  email: string;
  password: string;
  permissions: PermissionKey[];
}

export const CredentialsSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};
