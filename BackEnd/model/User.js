function User(Sequelize, DataTypes) {
  return Sequelize.define(
    'User',
    {
      U_IDX: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      USERID: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      EMAIL: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      PASSWORD: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      SALT: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      NICKNAME: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      IMAGE: {
        type: DataTypes.STRING(500),
        defaultValue: null,
      },
    },
    {
      tableName: 'USER',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = User;
