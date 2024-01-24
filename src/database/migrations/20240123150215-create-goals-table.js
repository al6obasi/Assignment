'use strict'

const { Sequelize } = require('sequelize')

/**
 * Migration for creating the 'goals' table.
 * @param {object} options - Options object containing the context with queryInterface.
 */
module.exports = {
    /**
     * Run the 'up' migration.
     * @param {object} options.context - Query interface context.
     */
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable(
            'goals',
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                title: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                status: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                due_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue:
                        Sequelize.literal('NOW()'),
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue:
                        Sequelize.literal('NOW()'),
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue:
                        Sequelize.literal('NOW()'),
                },
            },
            { schema: 'goal_trackers' },
        )
    },

    /**
     * Run the 'down' migration.
     * @param {object} options.context - Query interface context.
     */
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('goals')
    },
}
