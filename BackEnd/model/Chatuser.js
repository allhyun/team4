function Chatuser(Sequelize, DataTypes) {
  return Sequelize.define('chatuser', {
    u_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    r_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
}

module.exports = Chatuser;
