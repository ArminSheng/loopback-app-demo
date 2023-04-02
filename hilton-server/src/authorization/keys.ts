import {BindingKey} from '@loopback/context';
import {TokenService} from '@loopback/authentication';

/**
 * Binding keys used by this component.
 */
export namespace AuthBindings {
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'myjwts3cr3t';
  export const TOKEN_EXPIRES_IN_VALUE = '3600000';
}

export const Admin_Secret = 'myadmins3cr3t';
