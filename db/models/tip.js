'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tip = sequelize.define('Tip', {
    body: DataTypes.TEXT,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tip;
};