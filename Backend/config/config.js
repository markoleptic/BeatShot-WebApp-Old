require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.db_username,
    "password": process.env.db_password,
    "database": process.env.db_database,
    "host": process.env.db_localhost,
    "dialect": process.env.db_dialect,
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "live": {
    "username": process.env.db_username,
    "password": process.env.db_password,
    "database": process.env.db_database,
    "host": process.env.db_host,
    "port": process.env.db_port,
    "logging" : console.log,
    "maxConcurrentQueries": 100,
    "dialect": "mysql",
    "dialectOptions": {
      ssl: 'Amazon RDS'
    },
    "pool": { maxConnections: 5, maxIdleTime: 30},
    "language": 'en',
  }
}
