const express = require("express");

const router = express.Router();
const { validation } = require("../../middlewares");
const schemas = require("../../schemas/contact");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.getAllContacts);
router.get("/:id", ctrl.getById);

router.post("/", validation(schemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", validation(schemas.addSchema), ctrl.updateContact);

module.exports = router;
