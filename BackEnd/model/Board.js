function Board(Sequelize, DataTypes) {
  return Sequelize.define(
    'Board',
    {
      B_IDX: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      U_IDX: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      TITLE: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      CATEGORY: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      CONTENT: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      VIEWCOUNT: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      BREGDATE: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    },
    {
      tableName: 'BOARD',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = Board;
