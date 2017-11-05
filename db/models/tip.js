'use strict';
module.exports = (sequelize, DataTypes) => {

  var Tip = sequelize.define('Tip', {
    body: {
        type: DataTypes.TEXT
    },
    longitude: {
        type: DataTypes.FLOAT,
        defaultValue: 0.00
    },
    latitude: {
        type: DataTypes.FLOAT,
        defaultValue: 0.00
    },
    owner: {
        type: DataTypes.STRING
    },

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tip;
};
