const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/token');

module.exports = async (fastify) => {
  const { User, SessionToken } = fastify.db.models;
  const { Op } = fastify.Sequelize;

  fastify.post('/login', async (req, res) => {
    const {
      ip,
      body: {
        login,
        password,
      },
    } = req;

    res.errorMessage = 'Faild to login';

    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.iLike]: `%${login}%`,
            },
          },
          {
            email: {
              [Op.iLike]: `%${login}%`,
            },
          },
        ],
      },
    });

    if (!user) return { message: 'Invalid username or password' };

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) return { message: 'Invalid username or password' };

    res.transaction = await fastify.db.transaction();

    const token = await generateToken();
    if (!token) return { message: 'Internal Error' };

    const userSession = await SessionToken.create({ token, ip });
    await res.transaction.commit();

    user.addToken(userSession);

    return {
      status: 'success',
      message: 'User logged in',
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
