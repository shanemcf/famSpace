# famSpace
### We Got You, Fam

## Project 2 - Team 4
### Joseph Flanagan, Jessica Jernigan, Ryanne Killian, Shane McFadden (team lead)

## Description
A social media platform that caters to families.

## GitHub Repository
[GitHub](https://github.com/shanemcf/famSpace)

## Heroku Site
[Heroku](https://famspace.herokuapp.com/)

### Installation Instructions
* Download all files.
* Use npm to install dotenv, create a .env file and populate the following fields:
  * DB_NAME='famspace_db'
  * DB_USER='Your MySQL username'
  * DB_PW='Your MySQL Password'
  * SECRET="Your Secret"
* Use the following to install other remaining modules:
  * npm i mysql2 sequelize express express-handlebars express-session connect-session-sequelize bcrypt express-fileupload cors cloudinary dropzone
* Open MySQL and create the required database by typing "source db\schema.sql".
* Type "npm start" to run the express server and see the results by entering "http://localhost:3001" sans the quotes in your browser
