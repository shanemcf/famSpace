const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model { }

Profile.init(
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
  }
);

module.express = router;