'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey:'airplaneId',
        // ye alias hai jo flight ki every query ne airplane model ko refer kane ke liuye deefine kara hai
        as:'airplaneDetail'
      })
      this.belongsTo(models.Airport,{
        foreignKey:'departureAirportId',
        // for eveery association alias has to be different if you havwe more than one association with one table
        as: 'departureAirportDetail'
      })
      this.belongsTo(models.Airport,{
        foreignKey:'arrivalAirportId',
        as: 'arrivalAirportDetail'
      })
    }
  }
  /*
      flightNumber , airplaneId , departureAirportId,  arrivalAirportId , 
      arrivalTime , departureTime , price , boardingGate , totalSeats
   */
  Flight.init({
    flightNumber:{
      type:  DataTypes.STRING,
      allowNull:false
      },
    airplaneId:{
      type:  DataTypes.INTEGER,
      allowNull : false
      },
    departureAirportId:{
      type:  DataTypes.STRING,
      allowNull : false
      },
    arrivalAirportId:{
      type:  DataTypes.STRING,
      allowNull : false
      },
    arrivalTime:{
      type:  DataTypes.DATE,
      allowNull : false
      },
    departureTime:{
      type:  DataTypes.DATE,
      allowNull : false
      },
    price:{
      type:  DataTypes.INTEGER,
      allowNull : false
      },
    boardingGate:{
      type:  DataTypes.STRING
      },
    totalSeats:{ // totsal available seats
      type:DataTypes.INTEGER,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};