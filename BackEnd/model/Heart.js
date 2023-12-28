function Heart(Sequelize, DataTypes) {
  return Sequelize.define(
    'heart',
    {
      h_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      u_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      st_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      v_role: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: 'heart',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = Heart;
