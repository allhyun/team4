function Chatuser(Sequelize, DataTypes) {
  return Sequelize.define(
    'chatuser',
    {
      cu_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      u_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      r_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'chatuser',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = Chatuser;