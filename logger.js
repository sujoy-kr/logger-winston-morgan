// logger.js
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf } = format

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`
})

const logger = createLogger({
    level: 'info', // Set the minimum level of logs to capture
    format: combine(timestamp(), logFormat),
    transports: [
        new transports.Console(), // Logs to console
        new transports.File({ filename: 'error.log', level: 'error' }), // Logs errors to error.log
        new transports.File({ filename: 'combined.log' }), // Logs everything to combined.log
    ],
})

module.exports = logger
