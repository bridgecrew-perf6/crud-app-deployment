const { userController } = require('../controller')
const joi = require('joi')

module.exports = {
  name: 'CRUD',
  register: (server, options) => {
    const routes = [
      {
        method: 'GET',
        path: '/',
        config: {
          auth: false,
          description: 'Home Page',
          tags: ['api'],
          handler: () => {
            return "Hello World! Welcome to Saan's Application!"
          },
        },
      },
      {
        method: 'POST',
        path: '/api/user/createUser',
        config: {
          auth: false,
          description: 'Created the User',
          tags: ['api'],
          handler: userController.createHandler,
          validate: {
            payload: joi.object().keys({
              name: joi.string().label('Name').required(),
              password: joi.string().label('Password').required(),
              email: joi.string().allow('').label('Email'),
            }),
          },
        },
      },
      {
        method: 'GET',
        path: '/api/user/readUser',
        config: {
          auth: false,
          description: 'Fetch the User',
          tags: ['api'],
          handler: userController.fetchHandler,
        },
      },
      {
        method: 'PUT',
        path: '/api/user/updateUser',
        config: {
          auth: false,
          description: 'Updated the User',
          tags: ['api'],
          handler: userController.updateHandler,
        },
      },
      {
        method: 'DELETE',
        path: '/api/user/deleteUser/{id}',
        config: {
          auth: false,
          description: 'Deleted the User',
          tags: ['api'],
          handler: userController.deleteHandler,
        },
      },
    ]
    server.route(routes)
  },
}
