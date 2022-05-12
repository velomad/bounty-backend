"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      productName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      productImage: {
        allowNull: true,
        type: DataTypes.STRING
      },
      productDescription: {
        allowNull: true,
        type: DataTypes.STRING
      },
      productPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2)
      },
      productDiscount: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      productCategory: {
        allowNull: false,
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: { model: "Category", key: "id" }
      },
      productSubCategory: {
        allowNull: false,
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: { model: "SubCategory", key: "id" }
      },
      productInStock: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ["0", "1"],
        defaultValue: "1"
      }
    },
    {
      sequelize,
      modelName: "Product"
    }
  );
  return Product;
};
