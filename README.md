# famSpace
### We Got You, Fam

## Project 2 - Team 4
### Joseph Flanagan, Jessica Jernigan, Ryanne Killian, Shane McFadden (team lead)

## Description
A social media platform that caters to families.

## GitHub Repository
[GitHub](https://github.com/shanemcf/famSpace)

## Heroku Site
[Heroku]()

### Installation Instructions
* Download all files.
* Use npm to install dotenv, create a .env file and populate the following fields:
  * DB_NAME='famspace_db'
  * DB_USER='Your MySQL username'
  * DB_PW='Your MySQL Password'
  * SECRET="Your Secret"
* Use npm to install mysql2, sequelize, express, express-handlebars, express-session, connect-session-sequelize, and bcrypt.
* Open MySQL and create the required data base by typing "source db\schema.sql".
* Type "npm start" to run the express server and see the results by entering "http://localhost:3001" sans the quotes in your browser
