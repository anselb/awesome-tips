'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Tips', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            UserId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            body: {
                type: Sequelize.TEXT
            },
            longitude: {
                type: Sequelize.FLOAT,
                unique: true
            },
            latitude: {
                type: Sequelize.FLOAT,
                unique: true
            },
            vote: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Tips');
    }
};
