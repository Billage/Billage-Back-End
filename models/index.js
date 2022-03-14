const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Post = require('./post');
const Wish = require('./wish');
const Room = require('./room');
const Chat = require('./chat');
const Review = require('./review');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.Wish = Wish;
db.Room = Room;
db.Chat = Chat;
db.Review = Review;

User.init(sequelize);
Post.init(sequelize);
Wish.init(sequelize);
Room.init(sequelize);
Chat.init(sequelize);
Review.init(sequelize);

User.hasMany(Post, {foreignKey: 'userId'});
Post.belongsTo(User, {foreignKey: 'userId'});

Post.hasMany(Wish, {foreignKey: 'postId'});
Wish.belongsTo(Post, {foreignKey: 'postId'});

Post.hasMany(Wish, {foreignKey: 'postId'});
Review.belongsTo(Post, {foreignKey: 'postId'});

module.exports = db;
