const Ajv = require("ajv");

const ajv = new Ajv({ coerceTypes: true });

function validateParams(schema) {
  const validate = ajv.compile(schema);

  return (req, res, next) => {
    const valid = validate(req.params);

    if (!valid) {
        console.log("❌ Paramètre invalide :", req.params);
      return res.status(400).json({
        error: "Invalid route parameters",
        details: validate.errors
      });
    }

    next();
  };
}

module.exports = validateParams;
