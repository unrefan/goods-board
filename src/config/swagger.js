import Swagger from 'swagger-jsdoc';

const definition = {
  info: {
    title: 'Goods board',
    version: '1.0.0',
    description: 'RESTful API of goods board',
  },
  basePath: '/api'
};

export default Swagger({
  swaggerDefinition: definition,
  apis: ['./routes/*.js'],
});