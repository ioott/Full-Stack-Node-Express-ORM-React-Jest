const { DataTypes } = require('sequelize');
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(4, 2)
  },
  urlImage: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'url_image'
  }
}
module.exports = (sequelize) => {
  const Product = sequelize.define('Product', attributes, { tableName: 'products', timestamps: false });

  Product.associate = (models) => {
    Product.hasMany(models.SalesProduct,
    { foreignKey: 'productId', as: 'products' });
  }; 

  return Product;
};