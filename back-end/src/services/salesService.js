const models = require('../database/models');

const getAllProducts = async () => {
  const data = await models.Product.findAll();
  return data;
};

const addNewSale = async (body) => {
  const saleInfo = {
    products: body.products,
    userId: body.userId,
    sellerId: body.sellerId,
    totalPrice: body.totalPrice,
    deliveryAddress: body.deliveryAddress,
    deliveryNumber: body.deliveryNumber,
  };
  const data = await models.Sale.create(saleInfo);
  
  saleInfo.products.forEach(async (product) => {
    await models.SalesProduct.create({
      saleId: data.id,
      productId: product.id,
      quantity: product.quantity,
    });
  });
  return data;
};

const findSaleById = async (id) => {
  const { dataValues } = await models.SalesProduct.findOne(
    {
      where: { saleId: id },
    },
    {
      include: [
        {
          model: models.Sale,
          as: 'sale',
          through: { attributes: [] },
        },
        {
          model: models.Product,
          as: 'products',
          through: { attributes: [] },
        },
      ],
    },
  );

  return dataValues;

};
// const { dataValues } = await models.Sale.findByPk(id, {
//   include: [
//     {
//       model: models.Product,
//       as: 'products',
//       through: { attributes: ['quantity'] },
//     },
//   ],
// });

// const productsList = dataValues.products.map((product) => {
//   product.dataValues.quantity = product.SalesProduct.quantity;
//   delete product.dataValues.SalesProduct;
//   return product.dataValues;
// });
// dataValues.products = productsList;

// return dataValues;

module.exports = { getAllProducts, addNewSale, findSaleById };
