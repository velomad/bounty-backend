"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      productImage: {
        allowNull: true,
        type: Sequelize.STRING
      },
      productDescription: {
        allowNull: true,
        type: Sequelize.STRING
      },
      productPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      productDiscount: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      productCategory: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: { model: "Categories", key: "id" },
        onDelete: "CASCADE"
      },
      productSubCategory: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: { model: "SubCategories", key: "id" },
        onDelete: "CASCADE"
      },
      productInStock: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["0", "1"],
        defaultValue: "1"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Products");
  }
};
