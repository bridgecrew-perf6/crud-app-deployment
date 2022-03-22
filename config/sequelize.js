const Sequelize = require("sequelize");

const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = require('./env');

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    dialect: DB_DIALECT,
    host: DB_HOST,
    port: DB_PORT,
    logging: false,
});

module.exports = sequelize;
