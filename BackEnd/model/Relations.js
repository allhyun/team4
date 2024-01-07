const db = require('.');

// const db = require("../model");
module.exports = (db) => {
  // User가 Board랑 조인
  db.User.hasMany(db.Board, {
    foreignKey: 'U_IDX',
  });
  db.Board.belongsTo(db.User, {
    onDelete: 'cascade',
    foreignKey: 'U_IDX',
  });

  // User : Usedproducts
  db.User.hasMany(db.Usedproducts, {
    foreignKey: 'u_idx',
  });
  db.Usedproducts.belongsTo(db.User, {
    onDelete: 'cascade',
    foreignKey: 'u_idx',
  });

  // User : Study
  db.User.hasMany(db.Study, {
    foreignKey: 'u_idx',
  });
  db.Study.belongsTo(db.User, {
    onDelete: 'cascade',
    foreignKey: 'u_idx',
  });

  // User : Volunteer
  db.User.hasMany(db.Volunteer, {
    foreignKey: 'u_idx',
  });
  db.Volunteer.belongsTo(db.User, {
    onDelete: 'cascade',
    foreignKey: 'u_idx',
  });
  // Study : volunteer
  db.Study.hasMany(db.Volunteer, {
    foreignKey: 'st_idx',
  });
  db.Volunteer.belongsTo(db.Study, {
    onDelete: 'cascade',
    foreignKey: 'st_idx',
  });

  // User : Chattingroom
  db.User.hasMany(db.Chattingroom, {
    foreignKey: 'u_idx',
  });
  db.Chattingroom.belongsTo(db.User, {
    onDelete: 'cascade',
    foreignKey: 'u_idx',
  });

  // User : Chatmessage
  db.User.hasMany(db.Chatmessage, {
    foreignKey: 'u_idx',
  });
  db.Chatmessage.belongsTo(db.User, {
    onDelete: 'cascade',
    foreignKey: 'u_idx',
  });

  // Chattingroom : ChatMessage
  db.Chattingroom.hasMany(db.Chatmessage, {
    foreignKey: 'r_idx',
  });
  db.Chatmessage.belongsTo(db.Chattingroom, {
    onDelete: 'cascade',
    foreignKey: 'r_idx',
  });
};

// User : Chatuser
db.User.hasMany(db.Chatuser, {
  foreignKey: 'u_idx',
});
db.Chatuser.belongsTo(db.User, {
  onDelete: 'cascade',
  foreignKey: 'u_idx',
});
// Chattingroom : Chatuser
db.Chattingroom.hasMany(db.Chatuser, {
  foreignKey: 'r_idx',
});
db.Chatuser.belongsTo(db.Chattingroom, {
  onDelete: 'cascade',
  foreignKey: 'r_idx',
});
