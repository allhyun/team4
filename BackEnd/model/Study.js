function Study(Sequelize, DataTypes) {
  return Sequelize.define(
    'Study',
    {
      ST_IDX: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      U_IDX: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ST_TITLE: DataTypes.STRING(20),
      ST_INTRO: DataTypes.STRING(100),
      ST_NOW_MEM: DataTypes.INTEGER,
      ST_LIMIT: DataTypes.INTEGER,
      ST_DATE: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      ST_FE: DataTypes.INTEGER,
      ST_BE: DataTypes.INTEGER,
      ST_PUB: DataTypes.INTEGER,
      ST_FULL: DataTypes.INTEGER,
    },
    {
      tableName: 'STUDY',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = Study;
