const Sequelize = require('sequelize');
const config = require('../config/config.json')['development'];
// const config = require('../config/config.json')['production'];

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
// db.Chattingroom = require('./Chattingroom')(sequelize, Sequelize);
db.Chatmessage = require('./Chatmessage')(sequelize, Sequelize);
db.Volunteer = require('./Volunteer')(sequelize, Sequelize);
db.Heart = require('./Heart')(sequelize, Sequelize);
db.Chatuser = require('./Chatuser')(sequelize, Sequelize);

db.Useproduct = require('./Useproduct')(sequelize, Sequelize);
db.Category = require('./Category')(sequelize, Sequelize);

// db.Heart.belongsTo(db.Useproduct, {
//   foreignKey: 'ud_idx'
// });

// db.Useproduct.hasMany(db.Heart, {
//   foreignKey: 'ud_idx'
// });

// // 카테고리와의 다대다 관계 설정
// db.Useproduct.belongsToMany(db.Category,{
//   through: 'UseproductCategory', // 중간 테이블 이름
//   foreignKey: 'ud_idx', // Useproduct 모델이 참조하는 외래 키
//   otherKey: 'c_idx', // Category 모델이 참조하는 외래 키
// })

// Relations 파일
// require('./Relations')(db);

module.exports = db;
