const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Recursos',
            version: '1.0.0',
            description: 'Documentação da API para o microserviço de Recursos',
        },
        servers: [
            {
                url: 'http://localhost:3002', // Altere para a porta do seu servico-recursos
                description: 'Servidor de Desenvolvimento',
            },
        ],
        components: {
            schemas: {
                Recursos: {
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID do recurso',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            description: 'Nome do recurso',
                            example: 'Recursos 1',
                        },
                        capacidade: {
                            type: 'integer',
                            description: 'Capacidade de pessoas do recurso.',
                            example: 8
                        },
                        descricao: {
                            type: 'string',
                            description: 'Descrição detalhada do recurso.',
                            example: 'Sala com projetor e quadro branco.'
                        }
                    },
                    required: ['id', 'name', 'capacidade']
                }
            }
        }
    },
    apis: ['./src/reservations.routes.js'], // Ajuste o padrão se suas rotas estiverem em outro lugar
};

const specs = swaggerJsdoc(options);
module.exports = specs;