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
            beforeDefine: function(tip) {
                tip.vote = 1
            }
        }

    });
    return Tip;
};
