function Study(Sequelize, DataTypes) {
  return Sequelize.define(
    'study',
    {
      st_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      u_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      st_title: DataTypes.STRING(20),
      st_intro: DataTypes.STRING(100),
      st_now_mem: DataTypes.INTEGER,
      st_limit: DataTypes.INTEGER,
      st_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      st_fe: DataTypes.INTEGER,
      st_be: DataTypes.INTEGER,
      st_pub: DataTypes.INTEGER,
      st_full: DataTypes.INTEGER,
    },
    {
      tableName: 'study',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = Study;
