'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
      // to apply changes on the database level
      this.belongsTo(models.City,{
        foreignKey:'cityId',
        as: 'cityDetails'
           })
        this.hasMany(models.Flight,{
            /// ye woh columns hain jo flights mein exist karenge is naam se
            // actual mein kondsa column hai weoh toh migration me bta diyta h
        foreignKey:'departureAirportId',
        onDelete: 'CASCADE'
      })
        this.hasMany(models.Flight,{
          /// ye woh columns hain jo flights mein exist karenge is naam se
        foreignKey:'arrivalAirportId',
        onDelete: 'CASCADE'
      })
    }
  }
  Airport.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      code: {
        type: DataTypes.STRING,
         allowNull: false,
         unique:true
      },
      address: {
        type: DataTypes.STRING,
        unique: true
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};