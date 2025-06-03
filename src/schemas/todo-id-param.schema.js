module.exports = {
  type: "object",
  properties: {
    id: {
      type: "string",
      pattern: "^[1-9][0-9]*$" // string représentant un entier positif
    }
  },
  required: ["id"],
  additionalProperties: false
};
