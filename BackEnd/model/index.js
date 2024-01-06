const Sequelize = require('sequelize');
const config = require('../config/config.json')['development'];

const db = {};
const sequelize = new Sequelize(
  config.database, // db이름
  config.username, // 유저
  config.password, // pw,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Study = require('./Study')(sequelize, Sequelize);
// db.Board = require('./Board')(sequelize, Sequelize);
// db.Usedgoods = require('./Usedgoods')(sequelize, Sequelize);
db.Chattingroom = require('./Chattingroom')(sequelize, Sequelize);
db.Chatmessage = require('./Chatmessage')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Study = require('./Study')(sequelize, Sequelize);
db.Board = require('./Board')(sequelize, Sequelize);
// db.Usedgoods = require('./Usedgoods')(sequelize, Sequelize);
db.Chattingroom = require('./Chattingroom')(sequelize, Sequelize);
db.Chatmessage = require('./Chatmessage')(sequelize, Sequelize);
db.Volunteer = require('./Volunteer')(sequelize, Sequelize);
db.Heart = require('./Heart')(sequelize, Sequelize);
db.Chatuser = require('./Chatuser')(sequelize, Sequelize);
db.Usedproducts = require('./Usedproducts')(sequelize, Sequelize);
db.Category = require('./Category')(sequelize, Sequelize);

// db.Heart.belongsTo(db.Usedproducts,{
//   foreignKey: 'ud_idx'
// })

// db.Usedproducts.hasOne(db.Heart,{
//   foreignKey:'ud_idx'
// }
// )


db.Heart.belongsTo(db.Usedproducts, {
  foreignKey: 'ud_idx'
});

db.Usedproducts.hasOne(db.Heart, {
  foreignKey: 'ud_idx'
});


// Relations 파일
// require('./Relations')(db);

module.exports = db;
