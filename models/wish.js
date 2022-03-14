const Sequelize = require('sequelize');

module.exports = class Wish extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
          userId: { 
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        }, {
            sequelize,
            underscored: false,
            modelName: 'Wish',
            tableName: 'wishes',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
};