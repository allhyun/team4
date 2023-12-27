function ChatMessage(Sequelize, DataTypes) {
  return Sequelize.define(
    'ChatMessage',
    {
      MS_IDX: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      U_IDX: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      R_IDX: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      C_CONTENT: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      C_DATE: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    },
    {
      tableName: 'CHATMESSAGE',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = ChatMessage;
