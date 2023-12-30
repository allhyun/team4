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
      ud_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
