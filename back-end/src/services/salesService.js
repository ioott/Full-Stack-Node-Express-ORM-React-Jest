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

const findSaleById = async (id) => {
  const { dataValues } = await models.Sale.findByPk(id, {
    include: [{
      model: models.Product,
      as: 'products',
      },
    ],
  });

  // const post = await BlogPost.findByPk(id, {
  //   include: [{
  //   model: User,
  //   as: 'user',
  //   attributes: { exclude: ['password'] },
  //   },
  //   {
  //   model: Category,
  //   as: 'categories',
  //   through: {
  //   model: PostCategory,
  //   as: 'posts',
  //   attributes: { exclude: ['postId', 'categoryId'] },
  //   },
  //   }],
  //   });
  //   return post; 

  return dataValues;
};

module.exports = { getAllProducts, addNewSale, findSaleById };
