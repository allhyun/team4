function UsedGoods(Sequelize, DataTypes) {
  return Sequelize.define(
    'usedgoods',
    {
      ud_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      u_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ud_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ud_title: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      ud_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      viewcount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ud_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    },
    {
      tableName: 'usedgoods',
      freezeTableName: true,
      timestamps: { createdAt: true, updatedAt: false },
      createdAt: 'ud_date',
      updatedAt: false
    }
  );
}

module.exports = UsedGoods;
