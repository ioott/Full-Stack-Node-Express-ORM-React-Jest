const { sequelize, Product, Sale, SalesProduct, User } = require('../database/models');

const getAllProducts = async () => {
  const data = await Product.findAll();
  return data;
};

const getAllOrdersFromUser = async (id, role) => {
  const orders = role === 'seller'
  ? await Sale.findAll({ where: { sellerId: id } })
  : await Sale.findAll({ where: { userId: id } });
  return orders;
};

const addNewSale = ({
products, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }) => {
  try {
    return sequelize.transaction(async (t) => {
      const newOrder = await Sale.create({
        userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
      }, { transaction: t });

      await SalesProduct.bulkCreate(products.map((product) => ({
        saleId: newOrder.id,
        productId: product.id,
        quantity: product.quantity,
      })), { transaction: t });
    
      return newOrder;
    });  
  } catch (error) {
    console.log('ERRO', error);
    throw error;
  }
};

const findSaleById = async (id) => {
  const result = await Sale.findOne({ where: { id },
    include: [{ model: Product,
      as: 'products',
      through: { attributes: ['quantity'] },
    }, { model: User,
      as: 'seller',
      attributes: { exclude: ['password', 'email', 'role'] },
    }],
    attributes: { exclude: ['sellerId'] },
  });
  
  const productsList = result.products.map((product) => {
    const updatedProduct = product;
    updatedProduct.dataValues.quantity = product.SalesProduct.dataValues.quantity;
    delete updatedProduct.dataValues.SalesProduct;
    return updatedProduct;
  });
  result.dataValues.products = productsList;

  return result;
};

module.exports = {
  getAllProducts,
  addNewSale,
  findSaleById,
  getAllOrdersFromUser,
};
