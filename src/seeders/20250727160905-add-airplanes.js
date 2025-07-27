'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('Airplanes', [
        {
        modelNumber: "a203",
        capacity : 20,
        createdAt: new Date() ,
        updatedAt : new Date()
      },
      {
        modelNumber: "a500",
        capacity : 40,
        createdAt: new Date() ,
        updatedAt : new Date()
      }]);
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
