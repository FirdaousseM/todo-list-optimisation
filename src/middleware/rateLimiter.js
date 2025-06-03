const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requêtes par IP
  standardHeaders: true, // Retourne les headers RateLimit-* standards
  legacyHeaders: false,  // Désactive les headers X-RateLimit-*
  message: {
    error: "Too many requests, please try again later.",
  },
});

module.exports = limiter;
