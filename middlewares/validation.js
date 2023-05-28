const { HttpError } = require("../helpers");

const validation = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        HttpError(400, `missing required ${error.message.split(" ")[0]} field`)
      );
    }
    next();
  };
  return func;
};

module.exports = validation;
