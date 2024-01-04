function Category(Sequelize, DataTypes) {
  return Sequelize.define(
    'category',
    {
      c_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: 'category',
      freezeTableName: true
    }
  );
}

module.exports = Category;
