const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas', 'root', 'asuasenha', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;