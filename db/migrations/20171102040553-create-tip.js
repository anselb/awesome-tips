'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Tips', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            body: {
                type: Sequelize.TEXT
            },
            longitude: {
                type: Sequelize.FLOAT
            },
            latitude: {
                type: Sequelize.FLOAT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UserId: {
                type: Sequelize.INTEGER,
                references: {
                    model: Sequelize.User,
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Tips');
    }
};
