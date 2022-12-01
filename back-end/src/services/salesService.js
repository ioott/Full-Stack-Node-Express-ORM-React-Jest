const models = require('../database/models');

const getAllProducts = async () => {
  const data = await models.Product.findAll();
  return data;
};

const addNewSale = async (body) => {
  const { products, userId, sellerId, totalPrice, deliveryAddress,
    deliveryNumber } = body;
  const data = await models.Sale.create({ 
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    });
  products.forEach(async (product) => {
    await models.SalesProduct.create({ 
      saleId: data.id,
      productId: product.id,
      quantity: product.quantity });
  });
  return data;
};


module.exports = { getAllProducts, addNewSale };