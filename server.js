const express = require('express')
const morgan = require('morgan')
const logger = require('./logger')

const app = express()

app.use(
    morgan('combined', {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
)

app.get('/', (req, res) => {
    logger.info(
        `Client IP: ${req.ip}, Method: ${req.method}, URL: ${req.originalUrl}`
    )

    res.send('Hello, world!')
})

app.listen(5000, () => {
    logger.info('Server running on port 5000')
})

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`)
    process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`)
    process.exit(1)
})
