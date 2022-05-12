const { verifyUserAccessToken } = require("../../middlewares/jwt");
const { purchase, orderHistory } = require("./order.controller");

const router = require("express").Router();

// GET
router.get("/orderHistory", verifyUserAccessToken, orderHistory);

// POST
router.post("/purchase", verifyUserAccessToken, purchase);

// DELETE

module.exports = router;
