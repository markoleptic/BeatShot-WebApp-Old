require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.db_username_dev,
    "password": process.env.db_password_dev,
    "database": process.env.db_database_dev,
    "host": process.env.db_host_dev,
    "port": process.env.db_port,
    "dialect": process.env.db_dialect,
  },
  "docker-dev": {
    "username": process.env.db_username_dev,
    "password": process.env.db_password_dev,
    "database": process.env.db_database_dev,
    "host": process.env.db_host_dev_docker,
    "port": process.env.db_port,
    "dialect": process.env.db_dialect,
  },
  "production": {
    "username": process.env.db_username_production,
    "password": process.env.db_password_production,
    "database": process.env.db_database_production,
    "host": process.env.db_host_production,
    "port": process.env.db_port,
    "dialect": process.env.db_dialect,
  },
  "docker-production": {
    "username": process.env.db_username_production,
    "password": process.env.db_password_production,
    "database": process.env.db_database_production,
    "host": process.env.db_host_production,
    "port": process.env.db_port,
    "dialect": process.env.db_dialect,
  }
}
