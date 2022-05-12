const { login } = require("./auth.controller");

const router = require("express").Router();

// GET

// POST
router.post("/login", login);

// DELETE

module.exports = router;
