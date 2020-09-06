const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create our Post model
class Post extends Model {}


// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    caption: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    fam_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'fam',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;