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
db.Chatuser.hasMany(db.Chattingroom, {
  foreignKey: 'r_idx',
});
db.Chattingroom.belongsTo(db.Chatuser, {
  foreignKey: 'r_idx',
  onDelete: 'cascade',
});

// 상품 판매 부분 ...+===========================
// useproduct : user
db.User.hasMany(db.Useproduct, {
  foreignKey: 'u_idx',
});
db.Useproduct.belongsTo(db.User, {
  foreignKey: 'u_idx',
  onDelete: 'cascade',
});
// category : useproduct
db.Category.hasMany(db.Useproduct, {
  foreignKey: 'c_idx',
});

db.Useproduct.belongsTo(db.Category, {
  foreignKey: 'c_idx',
  onDelete: 'cascade',
});

//  user : heart
db.User.hasMany(db.Heart, {
  foreignKey: 'u_idx',
});

db.Heart.belongsTo(db.User, {
  foreignKey: 'u_idx',
  onDelete: 'cascade',
});

//  heart : useproduct
db.Heart.hasMany(db.Useproduct, {
  foreignKey: 'u_idx',
});

db.Useproduct.belongsTo(db.Heart, {
  foreignKey: 'u_idx',
  onDelete: 'cascade',
});

// buystate : useproduct
db.Buystate.hasMany(db.Useproduct, {
  foreignKey: 'buy_idx',
});

db.Useproduct.belongsTo(db.Buystate, {
  foreignKey: 'buy_idx',
  onDelete: 'cascade',
});
