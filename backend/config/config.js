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
  "live": {
    "username": process.env.db_username_live,
    "password": process.env.db_password_live,
    "database": process.env.db_database_live,
    "host": process.env.db_host_live,
    "port": process.env.db_port,
    "dialect": process.env.db_dialect,
  },
  "docker-live": {
    "username": process.env.db_username_live,
    "password": process.env.db_password_live,
    "database": process.env.db_database_live,
    "host": process.env.db_host_live,
    "port": process.env.db_port,
    "dialect": process.env.db_dialect,
  }
}
