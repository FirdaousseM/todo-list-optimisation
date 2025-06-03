module.exports = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 }
  },
  required: ["title"],
  additionalProperties: false
};
