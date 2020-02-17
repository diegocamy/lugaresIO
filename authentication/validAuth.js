const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(403).send('Sin autorizacion');

  jwt.verify(token, process.env.LLAVE, (err, user) => {
    if (err) return res.status(403).send('Sin autorizacion');

    req.user = user;
    next();
  });
};
