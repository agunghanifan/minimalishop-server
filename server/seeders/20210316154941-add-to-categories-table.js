'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert("Categories", [{
      name: "Uncatogories",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Fashion",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Electronic",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Healthy",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Computers & laptops",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Kitchen",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Office & Stationary",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Categories", null, {})
  }
};
