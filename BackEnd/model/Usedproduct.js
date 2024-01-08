function UsedProduct(Sequelize, DataTypes) {
  return Sequelize.define(
    'useproduct',
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
      buy_idx: {
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
      ud_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ud_image: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      ud_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ud_region: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      viewcount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      ud_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    },
    {
      tableName: 'useproduct',
      freezeTableName: true,
      timestamps: { createdAt: true, updatedAt: false },
      createdAt: 'ud_date',
      updatedAt: false,
    }
  );
}

module.exports = UsedProduct;
