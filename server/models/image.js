const Sequelize = require('sequelize');

module.exports = class Image extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            address: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Image',
            tableName: 'Images',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};