const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create our Post model
class Fam extends Model {}


// create fields/columns for Post model
Fam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    famKey: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'fam'
  }
);

module.exports = Fam;