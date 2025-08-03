'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // to apply changes on the database level
      this.belongsTo(models.City,{
        foreignKey:'cityId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
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