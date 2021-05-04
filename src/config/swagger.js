import Swagger from 'swagger-jsdoc';

const definition = {
  openapi: '3.0.2',
  info: {
    title: 'Goods board',
    version: '1.0.0', // todo version from package.json
    description: 'RESTful API of goods board',
  },
  servers: [
    {
      url: 'http://{host}:{port}/{basePath}',
      description: 'Development server',
      variables: {
        host: {
          default: process.env.APP_HOST,
        },
        port: {
          default: process.env.APP_PORT,
        },
        basePath: {
          default: 'api'
        },
      }
    },
  ],
};

export default Swagger({
  swaggerDefinition: definition,
  apis: ['src/routes/*.js'],
});