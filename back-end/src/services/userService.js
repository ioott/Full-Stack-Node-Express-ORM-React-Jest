const models = require('../database/models');

const getAllSellers = async () => {
  const data = await models.User.findAll({ 
    where: { role: 'seller' },
    attributes: { exclude: ['password', 'email', 'role'] }
  });
  return data;
};

module.exports = { getAllSellers };