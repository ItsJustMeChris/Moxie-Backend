const fastify = require('fastify')({ logger: true });

const fastifySequelize = require('fastify-sequelize');

fastify.register(fastifySequelize, {
  host: 'localhost',
  username: 'dev',
  database: 'moxie',
  password: 'dev',
  dialect: 'postgres',
  instance: 'db',
  autoConnect: true,
});

fastify.register(require('fastify-cors'), { origin: '*' });

/* Register Database Models */

fastify.register(require('./models/Strategy'));
fastify.register(require('./models/User'));
fastify.register(require('./models/Goal'));
fastify.register(require('./models/Motivation'));
fastify.register(require('./models/Status'));
fastify.register(require('./models/Comment'));

/* Register Routes */

fastify.register(require('./routes/user'), { prefix: '/v1/' });
fastify.register(require('./routes/user'), { prefix: '/v1/' });
fastify.register(require('./routes/goal'), { prefix: '/v1/' });
fastify.register(require('./routes/motivation'), { prefix: '/v1/' });
fastify.register(require('./routes/status'), { prefix: '/v1/' });
fastify.register(require('./routes/strategy'), { prefix: '/v1/' });


const start = async () => {
  try {
    await fastify.ready();
    await fastify.db.authenticate();
    await fastify.db.sync();
    await fastify.listen(3000);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
