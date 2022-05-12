const models = require("../../models");
module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const result = await models.Category.findAll({
        include: [
          {
            model: models.SubCategory,
            as: "subCategory",
            attributes: { exclude: ["categoryId", "CategoryId"] }
          }
        ]
      });
      res.status(200).json({
        status: "success",
        result
      });
    } catch (error) {
      next(error);
    }
  },

  addCategory: async (req, res, next) => {
    const body = req.body;
    try {
      const result = await models.Category.create(body);

      res.status(201).json({
        status: "success",
        result
      });
    } catch (error) {
      next(error);
    }
  },

  removeCategory: async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try {
      await models.Category.destroy({ where: { id: categoryId } });
      res.status(200).json({
        status: "success",
        message: "category deleted"
      });
    } catch (error) {
      next(error);
    }
  },

  addSubCategory: async (req, res, next) => {
    const body = req.body;
    try {
      const result = await models.SubCategory.create(body);
      res.status(201).json({
        status: "success",
        result
      });
    } catch (error) {
      next(error);
    }
  },

  removeSubCategory: async (req, res, next) => {
    const subCategoryId = req.params.subCategoryId;
    try {
      await models.SubCategory.destroy({ where: { id: subCategoryId } });
      res.status(200).json({
        status: "success",
        message: "sub-category deleted"
      });
    } catch (error) {
      next(error);
    }
  }
};
