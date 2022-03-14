const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            score: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            body: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            date: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            underscored: false,
            modelName: 'Review',
            tableName: 'reviews',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
};