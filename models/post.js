const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            body: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            price: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 0,
            },
            startDate: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            endDate: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            board: {
                type: Sequelize.ENUM('빌려주세요', '빌려줄게요'),
                allowNull: false,
            },
            date: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            url: {
                type: Sequelize.STRING,
            },
        }, {
            sequelize,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
};