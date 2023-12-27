const Sequelize = require("sequelize");
// const config = require("../config/config.json")["development"];

const db = {};
const sequelize = new Sequelize(
  config.database, // db이름
  config.username, // 유저
  config.password // pw
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.User = require("./User")(sequelize, Sequelize);
db.Study = require("./Study")(sequelize, Sequelize);
db.Board = require("./Board")(sequelize, Sequelize);
db.Usedgoods = require("./Usedgoods")(sequelize, Sequelize);
db.Chattingroom = require("./Chattingroom")(sequelize, Sequelize);
db.Chatmessage = require("./Chatmessage")(sequelize, Sequelize);

// User가 Board랑 조인
db.User.hasMany(db.Board, {
  foreignKey: "U_IDX",
});
db.Board.belongsTo(db.User, {
  onDelete: "cascade",
  foreignKey: "U_IDX",
});

// User : Usedgoods
db.User.hasMany(db.Usedgoods, {
  foreignKey: "U_IDX",
});
db.Usedgoods.belongsTo(db.User, {
  onDelete: "cascade",
  foreignKey: "U_IDX",
});

// User : Study
db.User.hasMany(db.Study, {
  foreignKey: "U_IDX",
});
db.Study.belongsTo(db.User, {
  onDelete: "cascade",
  foreignKey: "U_IDX",
});

// User : Volunteer
db.User.hasMany(db.Volunteer, {
  foreignKey: "U_IDX",
});
db.Volunteer.belongsTo(db.User, {
  onDelete: "cascade",
  foreignKey: "U_IDX",
});
// Study : volunteer
db.Study.hasMany(db.Volunteer, {
  foreignKey: "ST_IDX",
});
db.Volunteer.belongsTo(db.Study, {
  onDelete: "cascade",
  foreignKey: "ST_IDX",
});

// User : Chattingroom
db.User.hasMany(db.Chattingroom, {
  foreignKey: "U_IDX",
});
db.Chattingroom.belongsTo(db.User, {
  onDelete: "cascade",
  foreignKey: "U_IDX",
});

// User : Chatmessage
db.User.hasMany(db.Chatmessage, {
  foreignKey: "U_IDX",
});
db.Chatmessage.belongsTo(db.User, {
  onDelete: "cascade",
  foreignKey: "U_IDX",
});

// Chattingroom : ChatMessage 일단 chatting들 보류!!

module.exports = db;
