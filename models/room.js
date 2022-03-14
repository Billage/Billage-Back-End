const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
          roomId: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          user1: {
            type: Sequelize.STRING(15),
            allowNull: false,
          },
          user2: {
            type: Sequelize.STRING(15),
            allowNull: false,
          },
          user1Address: {
            type: Sequelize.STRING(15),
            allowNull: false,
          },
          user2Address: {
            type: Sequelize.STRING(15),
            allowNull: false,
          },
          latest: {
            type: Sequelize.STRING(1000),
            allowNull: true,
          },
        }, {
            sequelize,
            underscored: false,
            modelName: 'Room',
            tableName: 'rooms',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
};