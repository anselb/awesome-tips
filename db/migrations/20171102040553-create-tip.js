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
                type: Sequelize.FLOAT,
                unique: true
            },
            latitude: {
                type: Sequelize.FLOAT,
                unique: true
            },
            vote: {
                type: Sequelize.BOOLEAN,
                unique: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            owner: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
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
