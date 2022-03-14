const Sequelize = require('sequelize');

module.exports = class Chat extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
          body: {
            type: Sequelize.STRING(1000),
            allowNull: false,
          },
          sender: {
            type: Sequelize.STRING(15),
            allowNull: false,
          },
          roomId: {
            type: Sequelize.STRING(15),
            allowNull: false,
          },
          date: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        }, {
            sequelize,
            underscored: false,
            modelName: 'Chat',
            tableName: 'chats',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
};