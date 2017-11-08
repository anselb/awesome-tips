'use strict';
module.exports = (sequelize, DataTypes) => {
    var Tip = sequelize.define('Tip', {
        body: { type: DataTypes.TEXT },
        longitude: { type: DataTypes.FLOAT },
        latitude: { type: DataTypes.FLOAT },
        vote: { type: DataTypes.INTEGER, defaultValue: 0 },
        UserId: { type: DataTypes.INTEGER }
    });

    Tip.associate = function (models) {
        Tip.belongsTo(models.User);
    };

    // Tip.countVotes =function() {
    //     this.findAll().then(function(tips) {
    //         // sum the votes
    //         return this.vote
    //     })
    // }
    //
    // Tip.prototype.getVoteCount =function() {
    //     return this.vote
    // }

    return Tip;
};
