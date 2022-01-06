const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas', 'root', 'nada2012', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;