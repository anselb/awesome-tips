'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tip = sequelize.define('Tip', {
      body: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT
  }, {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
  });
  return Tip;
};