module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cardDeck: {
        // JSON allows us to store non-relational data easily.
        // Non-relational data refers to data that we may not query across records.
        type: Sequelize.JSON,
      },
      playerHand: {
        // We need not store all JSON data in a single JSON column. In this case,
        // we can split our JSON columns for data segregation, to increase
        // transparency in how we use our data.
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Games');
  },
};
