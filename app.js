const fastify = require('fastify')({ logger: true, level: process.env.NODE_ENV === 'production' ? 'error' : 'info' });
const Sequelize = require('sequelize');

if (process.env.NODE_ENV !== 'production') {
  fastify.log.info('Production mode not detected, loading from .env');
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
  username: 'dev',
  password: 'dev',
  database: 'moxie',
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
});


fastify.register(require('fastify-cors'), { origin: '*' });

/* Register Database Models */

sequelize.import('./models/Strategy')
  .import('./models/SessionToken')
  .import('./models/User')
  .import('./models/Goal')
  .import('./models/Motivation')
  .import('./models/Status')
  .import('./models/Comment');

fastify.db = sequelize;
fastify.Sequelize = Sequelize;

/* Register Routes */

fastify.register(require('./routes/user'), { prefix: '/v1/' });
// fastify.register(require('./routes/user'), { prefix: '/v1/' });
// fastify.register(require('./routes/goal'), { prefix: '/v1/' });
// fastify.register(require('./routes/motivation'), { prefix: '/v1/' });
// fastify.register(require('./routes/status'), { prefix: '/v1/' });
// fastify.register(require('./routes/strategy'), { prefix: '/v1/' });

fastify.setErrorHandler((error, req, res) => {
  if (res.transaction) res.transaction.rollback();
  fastify.log.error(error);
  return res.type('application/json').code(500).send({ status: 'error', message: res.errorMessage || 'Server encountered an error.' });
});

const start = async () => {
  try {
    await fastify.ready();
    await sequelize.authenticate();
    await sequelize.sync();
    await fastify.listen(process.env.SERVERPORT);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
