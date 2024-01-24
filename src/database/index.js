const { DataTypes, Sequelize } = require('sequelize')
const { SequelizeStorage, Umzug } = require('umzug')
const GoalModel = require('./models/goal.js')
const {
    InternalServerError,
} = require('../helpers/Errors.js')

const { config } = require('dotenv')
config()

/**
 * Database Singleton Class for managing database connections, migrations, and seeders.
 */
class Database {
    /**
     * Create or return an instance of the Database class.
     * @param {object} config - Sequelize configuration options.
     */
    constructor(config) {
        if (!Database.instance) {
            this.sequelize = new Sequelize({
                ...config,
                searchPath: `public,${config.schema}`,
                dialect: 'postgres',
                databaseVersion: '11.2.0',
            })

            console.info(
                `Ensuring schema ${config.schema} exists...`,
            )
            this.sequelize.createSchema(config.schema, {
                logging: console.log,
            })

            console.info(`Schema ${config.schema} exists.`)

            this.models = {
                Goal: GoalModel(this.sequelize, DataTypes),
            }

            Database.instance = this
        }

        return Database.instance
    }

    /**
     * Create an instance of Umzug with the provided migration or seeder path.
     * @param {string} path - Path to the migrations or seeders files.
     * @returns {Umzug} Umzug instance for running migrations or seeders.
     * @throws {Error} If an error occurs while creating Umzug instance.
     */
    umzugInstance(path) {
        try {
            return new Umzug({
                context: this.sequelize.getQueryInterface(),
                migrations: {
                    glob: [path, { cwd: __dirname }],
                },
                storage: new SequelizeStorage({
                    sequelize: this.sequelize,
                }),
                logger: console,
            })
        } catch (error) {
            throw new InternalServerError(
                'Unable to instance umzug instance',
            )
        }
    }

    /**
     * Initialize the database by authenticating, running migrations, and seeders.
     */
    async initialize() {
        await this.authenticate()
        await this.runMigrate()
        await this.runSeeders()
    }

    /**
     * Authenticate the database connection.
     */
    async authenticate() {
        try {
            await this.sequelize.authenticate()
            console.log(
                'Database connection has been established successfully.',
            )
        } catch (error) {
            console.error(
                'Unable to connect to the database:',
                error,
            )
            throw new InternalServerError(
                'Unable to connect to the database:',
            )
        }
    }

    /**
     * Run pending migrations.
     */
    async runMigrate() {
        try {
            await this.umzugInstance('migrations/*.js').up()
            console.log(
                'Migrations have been executed successfully.',
            )
        } catch (error) {
            console.error(
                'Error running migrations:',
                error,
            )
            throw new InternalServerError(
                'Error running migrations:',
            )
        }
    }

    /**
     * Run pending seeders.
     */
    async runSeeders() {
        try {
            await this.umzugInstance('seeders/*.js').up()
            console.log(
                'Seeders have been executed successfully.',
            )
        } catch (error) {
            console.error('Error running seeders:', error)
            throw new InternalServerError(
                'Error running seeders:',
            )
        }
    }
}

module.exports = Database
