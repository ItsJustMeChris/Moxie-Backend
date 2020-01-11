const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/token');

module.exports = async (fastify) => {
  const { User, SessionToken } = fastify.db.models;
  fastify.post('/new', async (req, res) => {
    const {
      ip,
      body: {
        username,
        email,
        password,
        name,
      },
    } = req;

    res.errorMessage = 'Faild to register user';

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    res.transaction = await fastify.db.transaction();

    const user = await User.create({
      username,
      email,
      password: hash,
      name,
    });

    if (!user) return { status: 'error', message: 'Failed to register' };

    const token = await generateToken();
    const userSession = await SessionToken.create({ token, ip });

    if (!userSession) return { status: 'error', message: 'Failed to login' };

    await res.transaction.commit();
    user.addToken(userSession);

    return {
      status: 'success',
      message: 'User created',
      token,
      user:
      {
        name: user.name,
        username: user.username,
        id: user.id,
      },
    };
  });
};
