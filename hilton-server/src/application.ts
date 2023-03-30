import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {GraphQLBindings, GraphQLComponent} from '@loopback/graphql';
import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {ReservdbDataSource} from './datasources';
import {UserCredentialsRepository, _UserRepository} from './repositories';
import {
  JWTService,
  JWTStrategy,
  MyAuthBindings,
  UserPermissionsProvider,
} from './authorization';

export {ApplicationConfig};

export class HiltonServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // Graphql component
    this.component(GraphQLComponent);
    this.configure(GraphQLBindings.GRAPHQL_SERVER).to({
      asMiddlewareOnly: true,
    });

    this.bind(GraphQLBindings.GRAPHQL_AUTH_CHECKER).to(
      (resolverData, roles) => {
        // Use resolverData and roles for authorization
        return true;
      },
    );

    // Bind user and credentials repository
    // this.bind(UserServiceBindings.USER_REPOSITORY).toClass(_UserRepository),
    //   this.bind(UserServiceBindings.USER_CREDENTIALS_REPOSITORY).toClass(
    //     UserCredentialsRepository,
    //   ),
    // JWT
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind JWT & permission authentication strategy related elements
    registerAuthenticationStrategy(this, JWTStrategy);
    this.bind(MyAuthBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(MyAuthBindings.USER_PERMISSIONS).toProvider(
      UserPermissionsProvider,
    );

    // Bind datasource
    this.dataSource(ReservdbDataSource, UserServiceBindings.DATASOURCE_NAME);

    const server = this.getSync(GraphQLBindings.GRAPHQL_SERVER);
    this.expressMiddleware('middleware.express.GraphQL', server.expressApp);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers', 'graphql-resolvers'],
        extensions: ['.js'],
        nested: true,
      },
    };
  }
}
