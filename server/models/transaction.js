'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            // define association here
        }
    }
    transaction.init(
        {
            txHash: {
                type:DataTypes.STRING(300),
                allowNull: false, //필수값
            },
            method: {
                type:DataTypes.STRING(30),
                allowNull: false, //필수값
            },
            token: {
                type:DataTypes.INTEGER(100),
                allowNull: false, //필수값
            },
            userId: {
                type:DataTypes.INTEGER(100),
                allowNull: true,
            },

        },
        {
            sequelize,
            modelName: 'transaction',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    );
    transaction.associate = (db) => {};
    return transaction;
};