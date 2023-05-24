const express = require("express");
const Joi = require("joi");

const router = express.Router();
const contactsOperations = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  // phone: Joi.string().pattern(/^\d*$/).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await contactsOperations.getContactById(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    // res.json({ message: "template message" });
    if (error) {
      console.log(error.message);
      throw HttpError(400, error.message);
    }
    const contact = await contactsOperations.addContact(req.body);

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Contact added successfully",
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsOperations.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact updated successfully",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
