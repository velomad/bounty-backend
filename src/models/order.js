'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    userId: DataTypes.INTEGER,
    transactionId: DataTypes.STRING,
    productName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    productDescription: DataTypes.STRING,
    productPrice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};