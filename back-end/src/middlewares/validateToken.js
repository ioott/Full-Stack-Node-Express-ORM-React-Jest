const jwt = require('../services/jwtService');
const { throwCustomError } = require('../services/utils');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const tokenData = await jwt.tokenValidation(authorization);
 
  if (tokenData.role === 'administrator') {
    return next();
  }
  throwCustomError(401, 'não autorizado');
};

module.exports = validateToken;
