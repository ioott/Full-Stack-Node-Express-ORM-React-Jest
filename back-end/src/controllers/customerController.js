const { getAllProducts, addNewSale  } = require('../services/salesService');

const getAll = async (req, res, next) => {
  const data = await getAllProducts();
  return res.status(200).json(data);   
};

const addSale = async (req, res) => {
  // const { products, userId, sellerId, totalPrice, deliveryAddress,
  //    deliveryNumber, saleDate, status } = req.body;
  const data = await addNewSale(req.body);
  console.log(data);
  return res.status(201).json(data.id);
};

module.exports = { getAll, addSale };