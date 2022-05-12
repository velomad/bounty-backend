const models = require("../../models");
const createError = require("http-errors");
const { upload, destroy } = require("../../cloudinary");
const { getPublicId } = require("../../utils/cloudinary");
const paginate = require("../../utils/paginate");

module.exports = {
  singleProduct: async (req, res, next) => {
    const productId = req.params.productId;
    try {
      const findProduct = await models.Product.findOne({
        where: { id: productId }
      });

      res.status(200).json({
        status: "success",
        result: findProduct
      });
    } catch (error) {
      next(error);
    }
  },

  getAllProducts: async (req, res, next) => {
    const { page, limit } = req.query;
    try {
      
        // filter search to be added for filter based product search
      let search = {};

      let associations = [];

      const result = await paginate(
        models.Product,
        associations,
        page,
        limit,
        search,
        next
      );
      res.status(200).json({
        result
      });
    } catch (error) {
      next(error);
    }
  },

  addProduct: async (req, res, next) => {
    const body = req.body;
    try {
      if (!req.file) {
        throw createError.UnprocessableEntity("No image provided");
      }
      const image = req.file.path;

      const response = await upload(image);

      const result = await models.Product.create({
        ...body,
        productImage: response.url
      });

      res.status(201).json({
        status: "success",
        result
      });
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req, res, next) => {
    const body = req.body;
    const productId = req.params.productId;
    try {
      const findProduct = await models.Product.findOne({
        where: { id: productId }
      });

      if (!findProduct)
        throw createError.NotFound("Product Not Found with Id-" + productId);

      await models.Product.update(body, {
        where: { id: productId }
      });

      res.status(200).json({
        status: "success",
        message: "Product Details Updated"
      });
    } catch (error) {
      next(error);
    }
  },

  updateProductImage: async (req, res, next) => {
    const productId = req.params.productId;

    try {
      if (!req.file) {
        throw createError.UnprocessableEntity("No image provided");
      }
      const image = req.file.path;

      const findProduct = await models.Product.findOne({
        where: { id: productId }
      });

      if (!findProduct)
        throw createError.NotFound("Product Not Found with Id-" + productId);

      // extracting public ID from the image
      const publicId = getPublicId(findProduct.productImage);

      // publicId comming from getpublicId utility function
      destroy(publicId);

      const response = await upload(image);

      const result = await models.Product.update(
        { productImage: response.url },
        { where: { id: productId } }
      );

      res.status(200).json({ status: "success", result });
    } catch (error) {
      next(error);
    }
  },

  deleteProductImage: async (req, res, next) => {
    const productId = req.params.productId;

    try {
      const findProduct = await models.Product.findOne({
        where: { id: productId }
      });

      if (!findProduct)
        throw createError.NotFound("Product Not Found with Id-" + productId);

      // extracting public ID from the image
      const publicId = getPublicId(findProduct.productImage);

      // publicId comming from getpublicId utility function
      destroy(publicId);

      res
        .status(200)
        .json({ status: "success", message: "Product Image Deleted" });
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req, res, next) => {
    const productId = req.params.productId;
    try {
      const findProduct = await models.Product.findOne({
        where: { id: productId }
      });

      if (!findProduct)
        throw createError.NotFound("Product Not Found with Id-" + productId);

      // extracting public ID from the image
      const publicId = getPublicId(findProduct.productImage);

      const result = await models.Product.destroy({ where: { id: productId } });
      if (result === 1) {
        // publicId comming from getpublicId utility function
        destroy(publicId);
      }

      res.status(200).json({ status: "success", message: "Product Deleted" });
    } catch (error) {
      next(error);
    }
  }
};
