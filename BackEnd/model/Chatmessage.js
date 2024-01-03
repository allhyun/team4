function ChatMessage(Sequelize, DataTypes) {
  return Sequelize.define(
    'chatmessage',
    {
      ms_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      u_idx: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      r_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      c_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      c_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    },
    {
      tableName: 'chatmessage',
      freezeTableName: true,
      timestamps: { createdAt: true, updatedAt: false },
      createdAt: 'c_date',
      updatedAt: false,
    }
  );
}

module.exports = ChatMessage;
