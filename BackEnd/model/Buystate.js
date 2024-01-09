function Category(Sequelize, DataTypes) {
  return Sequelize.define(
    'buystate',
    {
      buy_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      buystate: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: 'buystate',
      freezeTableName: true,
    }
  );
}

module.exports = Buystate;
