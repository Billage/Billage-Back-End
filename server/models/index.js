const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Post = require('./post');
const Image = require('./image');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.Image = Image;

User.init(sequelize);
Post.init(sequelize);
Image.init(sequelize);

User.hasMany(Post, {foreignKey: 'witer_id'});
Post.belongsTo(User, {foreignKey: 'witer_id'});

Post.hasMany(Image, {foreignKey: 'post_id'});
Image.belongsTo(Post, {foreignKey: 'post_id'});

module.exports = db;
