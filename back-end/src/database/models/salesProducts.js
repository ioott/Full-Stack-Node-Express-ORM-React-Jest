const { DataTypes } = require('sequelize');
const attributes = {
  saleId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'Sales',
      key: 'id'
    },
    field: 'sale_id'
  },
  productId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'id'
    },
    field: 'product_id'
  },
  quantity: {
    type: DataTypes.INTEGER
  }
}
module.exports = (sequelize) => {
  const SalesProduct = sequelize.define('SalesProduct', attributes, { tableName: 'sales_products', timestamps: false })
  SalesProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      through: SalesProduct,
      // foreignKey: 'productId',
      as: 'sale',
      // otherKey: 'saleId'
    });
    models.Product.belongsToMany(models.Sale, {
      through: SalesProduct,
      // foreignKey: 'saleId',
      as: 'product',
      // otherKey: 'productId'
    });
  }
  return SalesProduct;
};
