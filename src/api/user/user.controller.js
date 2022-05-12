const models = require("../../models");
const createError = require("http-errors");

module.exports = {
  register: async (req, res, next) => {
    const body = req.body;
    try {
      const user = await models.User.findOne({
        where: { emailId: body.emailId }
      });
      if (user)
        throw createError.Conflict("User with Email-ID Already Exist !");

      const result = await models.User.create({
        ...body
      });

      res.status(201).json({ status: "success", result });
    } catch (error) {
      next(error);
    }
  }
};
