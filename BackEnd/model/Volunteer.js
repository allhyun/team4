function Volunteer(Sequelize, DataTypes) {
  return Sequelize.define(
    'volunteer',
    {
      v_idx: {
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
        allowNull: false,
      },
      v_role: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: 'volunteer',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = Volunteer;
