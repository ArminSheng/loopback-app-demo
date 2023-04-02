// export-graphql-schema.ts, sibling to application.ts
import {GraphQLServer} from '@loopback/graphql';
import {HiltonServerApplication, ApplicationConfig} from './application';

async function exportGraphQLSchema(): Promise<void> {
  const config: ApplicationConfig = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST ?? 'localhost',
    },
  };
  const outFile = process.argv[2] ?? '';
  const app = new HiltonServerApplication(config);
  await app.boot();
  const server = await app.getServer(GraphQLServer);
  await server.exportGraphQLSchema(outFile);
}

exportGraphQLSchema().catch(err => {
  console.error('Fail to export GraphQL spec from the application.', err);
  process.exit(1);
});
