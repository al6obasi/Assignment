Assignment Title: Development of a Goal Tracker REST API

Objective:
Create a RESTful API for a goal tracker application using Node.js and a database (SQL or NoSQL). This API will allow users to manage their personal goals with functionalities such as adding, viewing, updating, and deleting goals.

Project Setup:

Create a basic Node.js application with your choice of libraries and frameworks.
Set up a database connection using a technology that you are comfortable with.

API Design:
The API should support basic CRUD (Create, Read, Update, Delete) operations for goals.
Each goal can have attributes like an identifier, title, description, due date, and completion status.

Endpoint Requirements:
An endpoint to add a new goal.
An endpoint to view all goals, with optional filtering capabilities (like based on completion status).
An endpoint to update an existing goal.
An endpoint to delete a goal.
Any additional endpoints you consider necessary for this functionality.

NOTE:
It is not Required to implement all functionality. We are more interested in your way of thinking and addressing the issue.

### assignment - Goal Trackers Platform RESTful API

### Description

assignment is a RESTful API for a Goal Trackers platform built using native Node.js, Sequelize as the ORM for postgresSQL, 
The API provides endpoints to manage goals, pagination, and sorting. The application is dockerized for easy deployment.

### Features

-   CRUD operations for managing goals
-   Pagination and sorting of goals
-   Dockerized application for easy deployment

### Installation and Running the Application

-   Clone the repository:
    `git clone https://github.com/al6obasi/assignment.git`

-   Change into the project directory:
    `cd assignment`

-   Install the required dependencies:
    `yarn install`

-   Start the application:
    `yarn start`

## Prerequisites

-   Docker & Docker compose
-   Node V20.2.0

### Installation and Running the Application with Docker and docker-compose

-   Clone the repository:
    `git clone https://github.com/al6obasi/assignment.git`

-   Change into the project directory:
    `cd assignment`

-   Update the default enviourment vairable exists on .default.env

-   Make sure the docker service is runing in your machine then run
    `docker-compose up`

-   Navigate to http:localhost:3000 and start testing the CRUD API

    -   / => GET : this is the root route will return Hello world
    -   /goal => GET: retrive the goals we have
    -   /goal/:ID GET: retrive a single goal
    -   /goal => POST: create a new goal
    -   /goal => PATCH: update existing goal
    -   /goal => DELETE: delete existing goal

-   There is a file contains our Goalman requests called `Goal Trackers Platform RESTful API.postman_collection` in the root directory

## Project Structure (Tree)

project/
|-- node_modules/
|-- src/
|-- |-- constants/
| |-- index.js
| |-- controllers/
| |-- GoalController.js
| |-- database/
| |-- migrations/
| |-- models/
| |-- seeders/
| |-- helpers/
| |-- middlewares/
| |-- AuthMiddleware.js
| |-- routes/
| |-- index.js
| |-- services/
| |-- AuthService.js
| |-- App.js
| |-- config.js
| |-- server.js
| |-- helpers/
| |-- errorHandler.js
| |-- successHandler.js
| |-- utils.js
|-- Dockerfile
|-- docker-compose.yml
|-- package.json
|-- yarn-lock
|-- .default.env
|-- .nvmrc
|-- .eslintignore
|-- .sequelizerc
|-- .prettierrc
|-- Goal Trackers Platform RESTful API.postman_collection.json
|-- .gitignore
|-- README.md

### Code Quality and Formatting

To maintain code quality and consistency, the project uses ESLint and Prettier.

## ESLint

ESLint is a powerful linting tool that enforces coding standards and checks for common errors and potential bugs. It helps maintain a consistent codebase and ensures code readability. ESLint is integrated with code editors and provides real-time feedback to developers.

## Prettier

Prettier is a code formatter that automatically formats the code to adhere to a consistent style defined by the Prettier configuration. It ensures that the codebase follows a consistent code style, making it more readable and avoiding debates over formatting choices.

By using ESLint and Prettier in combination, the project benefits from enhanced code quality, readability, and maintainability, fostering better collaboration among team members.

### Database Configuration

The project uses Sequelize as the ORM for GoalgreSQL. The database configuration is stored in the config.js file, where we can specify the database credentials, host, port, and other options.

### Running Migrations

To create and manage database migrations, we can use the Sequelize CLI. The CLI exposes a way to create migration files easily. For example:

`node src/database/migrator.js create --name my-migration.js --allow-confusing-ordering`

### Dockerization

The application is dockerized, which means it can be easily deployed and run as a container. Docker ensures that the application runs consistently across different environments, making it ideal for production deployment.

# Author

Mohammad Masaid
