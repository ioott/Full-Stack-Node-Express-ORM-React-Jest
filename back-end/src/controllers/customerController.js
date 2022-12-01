const salesService = require('../services/salesService');

const getAll = async (req, res, next) => {
  const data = await salesService.getAllProducts();
  return res.status(200).json(data);   
};

const addSale = async (req, res) => {
  // const { products, userId, sellerId, totalPrice, deliveryAddress,
  //    deliveryNumber, saleDate, status } = req.body;
  const data = await salesService.addNewSale(req.body);
  return res.status(201).json(data.id);
};

const findSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findSaleById(id);
  return res.status(200).json({ ...sale });
}

module.exports = { getAll, addSale, findSaleById };