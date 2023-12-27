const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];

const db = {};
const sequelize = new Sequelize( 
  config.database,
  config.username,
  config.password,
  config 
);


db.sequelize = sequelize;
db.Sequelize = Sequelize;



db.user = require("./user")(sequelize, Sequelize);
db.board = require("./board")(sequelize, Sequelize);
db.study = require("./study")(sequelize, Sequelize);
db.usedproduct = require("./ususedproduct")(sequelize, Sequelize);




module.exports = db;