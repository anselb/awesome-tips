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
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        UserId: {
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: function (models) {
                Tip.belongsTo(models.User);
            },
            countVotes: function() {
                return this.findAll()
                    .then(function(tips) {
                        return this.vote
                    })
            }
        },
        instanceMethods: {
            getVoteCount: function() {
                return this.vote
            }
        },
        hooks: {
            beforeSave: function(tip) {

            }
        }

    });
    return Tip;
};
