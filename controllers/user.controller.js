const db = require('../models');
const User = db.users;

const Op = db.Sequelize.Op;

// create #
// findAll #
// findOne
// update
// delete
// deleteAll


exports.create = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({
            message: 'Name is required!'
        });
        return;
    }

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    User.create(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || 'Algum erro ocorreu enquanto criavamos o usuário'
                });
        });
}

exports.findAll = (req, res) => {
    // busca todos os usuários 
}

exports.findOne = (req, res) => {
    // busca usuário por id
}

exports.update = (req, res) => {
    // atualiza um usuário
}

exports.delete = (req, res) => {
    // deleta um usuário
}

exports.deleteAll = (req, res) => {
    // deleta todos os usuários
}
