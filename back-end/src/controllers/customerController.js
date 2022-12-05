const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  const data = await salesService.getAllProducts();
  return res.status(200).json(data);   
};

const addSale = async (req, res) => {
  // {
  //   "userId": 4,
  //   "sellerId": 2,
  //   "products": [
  //       {
  //           "id": 1,
  //           "name": "Skol Lata 250ml",
  //           "price": "2.20",
  //           "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg",
  //           "quantity": 2
  //       },
  //       {
  //           "id": 2,
  //           "name": "Heineken 600ml",
  //           "price": "7.50",
  //           "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
  //           "quantity": 3
  //       }
  //   ],
  //   "totalPrice": 26.9,
  //   "deliveryAddress": "avenida do teste",
  //   "deliveryNumber": "42"
  // }

  const data = await salesService.addNewSale(req.body);
  return res.status(201).json(data.id);
};

const findSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findSaleById(id);
  return res.status(200).json(sale);
};

module.exports = { getAll, addSale, findSaleById };