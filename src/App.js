const {
    isOperationalError,
    logError,
} = require('./helpers/errorHandler')
const Database = require('./database')
const config = require('./database/config.js')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')

/**
 * The singleton instance of the App class for initializing the application and database.
 */
class App {
    /**
     * Creates the singleton instance of the App class.
     */
    constructor() {
        if (App.instance) {
            return App.instance
        }

        this.app = express()
        this.#initialize()
        App.instance = this

        return this
    }

    /**
     * Initializes the application and database.
     * @private
     */
    async #initialize() {
        await this.#initializeDB()
        this.#initializeServer()
    }

    /**
     * Initializes the database.
     * @private
     */
    async #initializeDB() {
        try {
            this.db = new Database(
                config[
                    process.env.APP_ENVIRONMENT ??
                        'development'
                ],
            )
            await this.db.initialize()
        } catch (error) {
            console.error(
                'Unable to connect to the database:',
                error,
            )
            throw error
        }
    }

    /**
     * Creates and initializes the Express application.
     * @private
     */
    #initializeServer() {
        const PORT = process.env.APP_PORT || 3000

        this.#setupMiddlewares()

        // Start the server
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

        /**
         * Event listener for unhandled promise rejections.
         * Throws the error to ensure it gets logged and handled properly.
         * @param {Error} error - The unhandled rejection error.
         */
        process.on('unhandledRejection', (error) => {
            logError(error)
            throw error
        })

        /**
         * Handle uncaught exceptions and log errors.
         * If the error is not operational, exit the process.
         */
        process.on('uncaughtException', (error) => {
            logError(error)

            if (!isOperationalError(error)) {
                process.exit(1)
            }
            return
        })
    }

    #setupMiddlewares() {
        // Middleware to attach the database instance to the request object
        this.app.use((req, res, next) => {
            req.db = this.db
            // I assumed there is one user for this assignment
            req.user = { id: 1 }
            next()
        })

        // Enable CORS
        this.app.use(cors())

        this.app.disable('x-powered-by')

        // Parse JSON bodies
        this.app.use(express.json())

        this.app.use(
            bodyParser.urlencoded({ extended: true }),
        )

        // Route handling
        this.app.use(routes)
    }
}

// Export the singleton instance to use throughout the application
module.exports = new App()
