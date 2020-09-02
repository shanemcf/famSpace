const { Model, DataTypes } = require('sequelize'); // Import these two objects from Sequelize. This Model class is what we create our own models from using the extends keyword so User inherits all of the functionality the Model class has.
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.user_password);
  }
}

// Define table columns and configuration. initialize the model's data and configuration, passing in two objects as arguments.
User.init(
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
    //define a first name column
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //define a last name column
    last_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    //define a birthdate column
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true
      }
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // define a password column
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least four characters long
        len: [4]
      }
    },
    
    fam_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'fam',
        key: 'id'
      }
    },
/*
    picture_id: {
      type:DataTypes.INTEGER,
      references:{
        model:'profile-picture',
        key: 'id'
      }
    }
    */
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.user_password = await bcrypt.hash(newUserData.user_password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.user_password = await bcrypt.hash(updatedUserData.user_password, 10);
        return updatedUserData;
      }
    },
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;