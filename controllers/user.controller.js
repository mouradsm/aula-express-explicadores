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
            res
                .status(201)
                .send(data)
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
    //TODO: Implementar busca com condição
    User.findAll()
        .then(data => {
            res
                .status(200)
                .send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Algum erro ocorreu enquanto recuperavamos os usuários"
                })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res
                .send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Erro ao buscar o usuário com id: " + id
                });
        })
}

exports.update = (req, res) => {
    const id = req.params.id;
    let body = req.body;

    User.update(body, {
        where: { id: id }
    }).then(occ => {
        if (occ == 1) {
            res
                .send({
                    message: "O usuário foi atualizado com sucesso."
                })
            return;
        }

        res.send({
            message: `Não foi possível atualizar o usuário. O id ${id} não foi encontrado. `
        })
    })
}

exports.delete = (req, res) => {
    // deleta um usuário
}

exports.deleteAll = (req, res) => {
    // deleta todos os usuários
}
