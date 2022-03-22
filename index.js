const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')
const routes = require('./routes')
const { PORT, NODE_ENV } = require('./config/env')

const server = Hapi.server({
  port: PORT,
  routes: {
    cors: true,
  },
})

const start = async () => {
  try {
    const swaggerOptions = {
      info: {
        title: 'crudHapi Master API',
        version: '1.0.0.0',
      },
      documentationPath: '/documentation/',
      schemes: NODE_ENV === 'LOCAL' ? ['http'] : ['https'],
    }
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
    ])

    await server.register(routes)
    await server.start()
    console.log(`Server running on: ${server.info.uri}`)
  } catch (err) {
    console.log(err.stack)
  }
}

start()

try {
  process.on('SIGINT', () => {
    console.log('Stopping hapi server')
    process.exit()
  })
} catch (err) {
  console.log(err)
}
