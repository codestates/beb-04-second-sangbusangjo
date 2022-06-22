'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Boards extends Model {
        static associate(models) {
        }
    }
    Boards.init(
        {
            id: {
                type: DataTypes.NUMBER,
                primaryKey: true,
            },
            writer: DataTypes.STRING,
            title: DataTypes.STRING,
            content: DataTypes.STRING,
            comments: DataTypes.STRING,
            createDate: DataTypes.STRING,
            modifiedDate: DataTypes.STRING,
            hit: DataTypes.Number,


        },
        {
            sequelize,
            modelName: 'Boards',
        }
    );
    return Boards;
};