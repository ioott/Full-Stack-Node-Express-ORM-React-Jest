const { Op } = require('sequelize');
const models = require('../database/models');

const getAllUsers = async () => {
  const data = await models.User.findAll({ 
    where: { role: { [Op.ne]: 'administrator' } },
    attributes: { exclude: ['password'] },
  });
  return data;
};

const getAllSellers = async () => {
  const data = await models.User.findAll({ 
    where: { role: 'seller' },
    attributes: { exclude: ['password', 'email', 'role'] },
  });
  return data;
};

const deleteUser = (id) => models.User.destroy({ where: { id } });

module.exports = { getAllSellers, getAllUsers, deleteUser };
