const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
  const data = await userService.getAllUsers();
  return res.status(200).json(data);   
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  return res.sendStatus(200).end();
};

module.exports = { getAllUsers, deleteUser };