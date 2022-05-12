const models = require("../../models");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { signAccessToken } = require("../../middlewares/jwt");

module.exports = {
  login: async (req, res, next) => {
    const body = req.body;

    try {
      const result = await models.User.findOne({
        WHERE: {
          emailId: body.emailId
        }
      });

      if (!result) {
        throw createError.Unauthorized("invalid emailId or password");
      }
      const comparedPass = await bcrypt.compare(body.password, result.password);

      if (!comparedPass)
        throw createError.Unauthorized("invalid emailId or password");

      const token = await signAccessToken(
        JSON.stringify(result.id),
        process.env.USER_ACCESS_TOKEN_SECRET
      );

      res.status(200).json({ status: "success", token });
    } catch (error) {
      next(error);
    }
  }
};
