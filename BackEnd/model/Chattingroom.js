function ChattingRoom(Sequelize, DataTypes) {
  return Sequelize.define(
    'ChattingRoom',
    {
      R_IDX: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      R_NAME: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      R_CREATE: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    },
    {
      tableName: 'CHATTINGROOM',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = ChattingRoom;
