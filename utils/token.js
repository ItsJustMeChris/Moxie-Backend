const crypto = require('crypto');

module.exports = async () => {
  try {
    const buffer = await new Promise((resolve, reject) => {
      crypto.randomBytes(256, (ex, buf) => {
        if (ex) {
          reject(ex);
        }
        resolve(buf);
      });
    });
    const token = crypto
      .createHash('sha1')
      .update(buffer)
      .digest('hex');
    return token;
  } catch (ex) {
    return 0;
  }
};
