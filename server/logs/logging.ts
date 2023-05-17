import winston from "winston";
import grok from "grok-js";

const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({filename: 'logs/server.log'})
  ],
});

export default logger;