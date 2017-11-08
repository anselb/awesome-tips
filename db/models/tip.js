'use strict';
module.exports = (sequelize, DataTypes) => {

    var Tip = sequelize.define('Tip', {
        body: {
            type: DataTypes.TEXT
        },
        longitude: {
            type: DataTypes.FLOAT
        },
        latitude: {
            type: DataTypes.FLOAT
        },
        vote: {
            type: DataTypes.INTEGER
        },
        owner: {
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: function (models) {
                Tip.belongsTo(models.User, {
                    key: 'owner',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
            }
        }
    });
    return Tip;
};
