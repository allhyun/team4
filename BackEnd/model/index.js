const Sequelize = require('sequelize');
const config = require('../config/config.json')['development'];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Board = require('./board')(sequelize, Sequelize);
db.Study = require('./study')(sequelize, Sequelize);
db.Usedgoods = require('./usedgoods')(sequelize, Sequelize);
db.Chattingroom = require('./chattingroom')(sequelize, Sequelize);
db.Chatmessage = require('./chatmessage')(sequelize, Sequelize);

module.exports = db;
