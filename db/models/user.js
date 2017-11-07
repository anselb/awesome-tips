'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
    });

    User.associate = function (models) {
        // associations can be defined here
        User.hasMany(models.Tip, {
            foreignKey: 'id',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })
    };

    User.prototype.generateHash = function (password) {
        var hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        console.log(hashedPass);
        return hashedPass;
    };

    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    return User;
};
