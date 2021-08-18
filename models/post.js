const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            body: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: '무료',
            },
            date: {
                type: Sequelize.TIME,
                allowNull: true,
            },
            board: {
                type: Sequelize.ENUM('빌려주세요', '빌려줄게요'),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
};