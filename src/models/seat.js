'use strict';
const {Enums}  = require("../utils/helpers")
const {BUSINESS,ECONOMY,PREMIUM_ECONOMY,FIRST_CLASS} = Enums.seatType
const {
  Model
} = require('sequelize');
// airplaneId , row, col , type
//
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
       this.belongsTo(models.Airplane,{
        foreignKey:'airplaneId'
      })
    }
  }
  Seat.init({
    airplaneId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    row:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    col:{
      type: DataTypes.STRING,
      allowNull: false
    },
    type:{
      type: DataTypes.ENUM,
      values:[BUSINESS,ECONOMY,PREMIUM_ECONOMY,FIRST_CLASS],
      defaultValue: ECONOMY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};