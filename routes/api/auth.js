const express = require("express");
const ctrl = require("../../controllers/auth");

const { validation } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validation(schemas.registerSchema), ctrl.register);
router.post("/login", validation(schemas.loginSchema), ctrl.login);

module.exports = router;
