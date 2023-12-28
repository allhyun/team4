function Board(Sequelize, DataTypes) {
  return Sequelize.define(
    'Board',
    {
      b_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      u_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      viewcount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bregdate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    },
    {
      tableName: 'board',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = Board;
