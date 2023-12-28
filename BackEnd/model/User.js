function User(Sequelize, DataTypes) {
  return Sequelize.define(
    'user',
    {
      u_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userid: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(500),
        defaultValue: null,
      },
    },
    {
      tableName: 'user',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = User;
