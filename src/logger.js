const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // Log les erreurs avec stack trace
    format.json() // Format JSON structuré
  ),
  transports: [
    new transports.Console(), // Affichage dans stdout (console)
    // Tu peux ajouter ici un transport fichier ou distant si besoin
  ],
});

module.exports = logger;
