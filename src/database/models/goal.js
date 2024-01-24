/**
 * Goal Model definition.
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} DataTypes - The DataTypes object.
 * @returns {import('sequelize').Model} The Goal model.
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * The Goal model definition.
     * @type {import('sequelize').Model}
     */
    const Goal = sequelize.define(
        'Goal',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            dueDate: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            tableName: 'goals',
            modelName: 'Goal',
        },
    )

    return Goal
}
