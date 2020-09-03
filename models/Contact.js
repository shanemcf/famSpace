const { Model, DataTypes } = require('sequelize'); // Import these two objects from Sequelize. This Model class is what we create our own models from using the extends keyword so Contact inherits all of the functionality the Model class has.
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


// create our Contact model
class Contact extends Model { }

// Define table columns and configuration. initialize the model's data and configuration, passing in two objects as arguments.
Contact.init(
  {
    // define an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    //define a telephone number column
    telephone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //define a address column
    address:{
      type: DataTypes.STRING,
      allowNull: true
    },
    // //define a user id column
    // user_id:{
    //     type: DataTypes.INTEGER,
    //     references:{
    //         model: 'user',
    //         key: 'id'
    //     }
    // }
  },
  {
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'contact'
  }
);

module.exports = Contact;