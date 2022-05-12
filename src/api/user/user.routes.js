const { register } = require("./user.controller");

const router = require("express").Router();

// GET

// POST
router.post("/register", register);

// DELETE

module.exports = router;
