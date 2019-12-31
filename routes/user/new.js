module.exports = async (fastify, opts) => {
  const { User } = fastify.db.models;
  fastify.get('/new', async (req, res) => {
    const a = 1;
    return { test: a };
  });
};
