
# BreakRoom
[![License](https://img.shields.io/github/license/marcusikegami/breakroom-blogsite)](LICENSE.txt)

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## Description 

BreakRoom is a blogsite web-application that allows users to: Create an account, Make/Edit/Delete posts, comment on posts, view their post profile, and login/logout from the site. Its structured using RESTful API guidelines and makes use of the browsers fetch() API. It was designed using handlebars.js as the templating engine, sequelize for database manipulation, bcrypt to hash passwords, and heroku to host the app.

## Installation

Clone the repo into the working directory. Run the command "npm i" in your Git CLI to install node_omdules. Create a .env file in the root directory and add lines "DB_NAME=", "DB_USER=", and "DB_PW=" with values respective to your MYSQL login and DB information. Open an instance of your MYSQL CLI and run the command "source db/schema.sql" to create the DB. Run the command "npm start" and if you have completed the previous steps successfully, the app will load and create the models and routes.

## Usage

Once the app is successfully installed and your server instance is running, navigate to localhost:3001/ in your browser to view the homepage. Create an account and login to create, view, edit, delete, and comment on posts. 

## Questions

[GitHub](https://github.com/marcusikegami)

**mikegami.github@gmail.com**

Please contact me via email at the address listed above.

## License

  Copyright (c) 2022 by Marcus Ikegami
  
  Licensed under the [MIT](LICENSE.txt) license.
  
