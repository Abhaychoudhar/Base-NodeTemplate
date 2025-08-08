'use strict';
//If we will change model schema from here then it will get change on the javaScript level only means that 
// then if you will send data from js it will work fine but if someone change data on the 
// databasse level it will not work
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight,{
        foreignKey:'airplaneId',
        onDelete: 'CASCADE'
      })
      this.hasMany(models.Seat,{
        foreignKey:'airplaneId',
        onDelete: 'CASCADE'
      })
    }
  }
  Airplane.init({
    modelNumber: {
      type :DataTypes.STRING,
      allowNull: false,
      defaultValue: ' ',
      validate:{
        isAlphanumeric: true 
      }
    },
    capacity: {
      type :DataTypes.INTEGER,
      allowNull: false,
      defaultValue:2,
        validate: {
    max: 1000,  // Capacity should not exceed 500
  }
    }
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};