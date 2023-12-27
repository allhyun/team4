function UsedGoods(Sequelize, DataTypes) {
  return Sequelize.define(
    'UsedGoods',
    {
      UD_IDX: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      U_IDX: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UD_PRICE: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UD_TITLE: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      UD_CONTENT: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      VIEWCOUNT: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UD_DATE: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    },
    {
      tableName: 'USEDGOODS',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = UsedGoods;
