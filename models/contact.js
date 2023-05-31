const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name" field`,
    "string.empty": `"name" cannot be an empty field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required "email" field`,
    "string.empty": `"email" cannot be an empty field`,
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "any.required": `missing required "phone" field`,
    "string.empty": `"phone" cannot be an empty field`,
  }),
  favorite: Joi.boolean(),
});

const schemas = {
  addSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
