'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addConstraint('Airports',{
        type:'foreign key',
        name:'city-fkey-constraint',
        fields: ['cityId'],
        references:{
          table: 'cities',
          field: 'id'
        },
        onDelete: 'CASCADE' ,
        onUpdate:'CASCADE'
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports','city-fkey-constraint') ;
  }
};
