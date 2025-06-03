const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true,coerceTypes: true });

function validateSchema(schema) {
  const validate = ajv.compile(schema);

  return (req, res, next) => {
    const valid = validate(req.body);

    if (!valid) {
      return res.status(400).json({
        error: "Validation error",
        details: validate.errors
      });
    }

    next();
  };
}

module.exports = validateSchema;
