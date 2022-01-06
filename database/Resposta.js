const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas", {

    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

Resposta.sync({force: false}).then(() => {
    console.log('Todas as tabelas foram criadas!');
});

module.exports = Resposta;