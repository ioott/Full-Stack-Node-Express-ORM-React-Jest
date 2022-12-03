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
  const SalesProduct = sequelize.define('SalesProduct', attributes, { tableName: 'salesProducts', timestamps: false })
  SalesProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      through: SalesProduct,
      foreignKey: 'productId',
      as: 'products',
      otherKey: 'saleId'
    });
    models.Product.belongsToMany(models.Sale, {
      through: SalesProduct,
      foreignKey: 'saleId',
      as: 'sales',
      otherKey: 'productId'
    });
  }
  return SalesProduct;
};

// PostCategory.associate = (models) => {
//   models.BlogPost.belongsToMany(models.Category, {
//   through: PostCategory,
//   as: 'categories',
//   foreignKey: "postId",
//   otherKey: "categoryId",
//   });
  
//   models.Category.belongsToMany(models.BlogPost, {
//   through: PostCategory,
//   as: 'posts',
//   foreignKey: "categoryId",
//   otherKey: "postId",
//   });
//   }; 