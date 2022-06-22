'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
        }
    }
    Users.init(
        {
            id: {
                type: DataTypes.NUMBER,
                primaryKey: true,
            },
            userId: DataTypes.STRING,
            userPassword: DataTypes.STRING,
            userEmail: DataTypes.STRING,
            userName: DataTypes.STRING,
            userAccount: DataTypes.STRING,
            userPrivateKey: DataTypes.STRING,
            userToken: DataTypes.STRING,
            userNft: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: 'Users',
        }
    );
    return Users;
};