'use strict'

const { generateGoals } = require('../../helpers/utils')

/**
 * @typedef {import('sequelize').QueryInterface} SequelizeQueryInterface
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * Run the seed function.
     *
     * @param {Object} params - Parameters object.
     * @param {SequelizeQueryInterface} params.context - The queryInterface provided by Sequelize.
     * @returns {Promise<void>} - A promise that resolves when the seeding is done.
     */
    async up({ context: queryInterface }) {
        console.log(queryInterface)
        await queryInterface.sequelize
            .query('SET search_path=goal_trackers,public')
            .then(async (data) => {
                console.log('DATA', data)
                await queryInterface.bulkInsert(
                    'goals',
                    generateGoals(),
                    {},
                )
            })
    },

    /**
     * Revert the seed function.
     *
     * @param {Object} params - Parameters object.
     * @param {SequelizeQueryInterface} params.context - The queryInterface provided by Sequelize.
     * @returns {Promise<void>} - A promise that resolves when the seeding is reverted.
     */
    async down({ context: queryInterface }) {
        await queryInterface.bulkDelete('goals', null, {})
    },
}
