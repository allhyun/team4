function Chattingroom(Sequelize, DataTypes) {
  return Sequelize.define(
    'chattingroom',
    {
      r_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      u_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      r_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      r_create: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    },
    {
      tableName: 'chattingroom',
      freezeTableName: true,
      timestamps: { createdAt: true, updatedAt: false },
      createdAt: 'r_create',
      updatedAt: false,
    }
  );
}

module.exports = Chattingroom;
