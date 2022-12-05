const { DataTypes } = require('sequelize');
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    field: 'user_id'
  },
  sellerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    field: 'seller_id'
  },
  totalPrice: {
    allowNull: false,
    type: DataTypes.DECIMAL(9, 2),
    field: 'total_price'
  },
  deliveryAddress: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'delivery_address'
  },
  deliveryNumber: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'delivery_number'
  },
  saleDate: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'sale_date'
  },
  status: {
    allowNull: false,
    defaultValue: 'Pendente',
    type: DataTypes.STRING
  }
}
module.exports = (sequelize) => {
  const Sale = sequelize.define('Sale', attributes, { tableName: 'sales', timestamps: false })
  Sale.associate = (models) => {
    models.Sale.belongsTo(models.User, {
      as: 'user'
      // foreignKey: 'userId'
    });
    models.Sale.belongsTo(models.User, {
      as: 'seller'
      // foreignKey: 'sellerId'
    });
  }
  return Sale;
};