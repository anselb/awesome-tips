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
