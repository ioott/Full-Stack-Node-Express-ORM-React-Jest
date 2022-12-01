const userService = require('../services/userService');

const getAllSellers = async (req, res) => {
  const data = await userService.getAllSellers();
  return res.status(201).json(data);
};

module.exports = { getAllSellers };