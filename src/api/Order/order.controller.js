const models = require("../../models");

module.exports = {
  purchase: async (req, res, next) => {
    const body = req.body;
    const { aud } = req.payload;
    try {
      const result = await models.Order.create({
        userId: aud,
        ...body
      });

      res.status(201).json({
        stats: "success",
        result
      });
    } catch (error) {
      next(error);
    }
  },

  orderHistory: async (req, res, next) => {
    const { aud } = req.payload;
    try {
      const result = await models.Order.findAll({ where: { userId: aud } });
      res.status(200).json({
        status: "success",
        result
      });
    } catch (error) {
      next(error);
    }
  }
};
