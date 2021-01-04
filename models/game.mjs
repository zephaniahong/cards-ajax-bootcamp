export default function gameModel(sequelize, DataTypes) {
  return sequelize.define('Game', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    cardDeck: {
      type: DataTypes.JSON,
    },
    playerHand: {
      type: DataTypes.JSON,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
}
