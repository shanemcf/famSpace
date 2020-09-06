const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProfilePic extends Model { }

ProfilePic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'profilepic'
  }
);

module.exports = ProfilePic;