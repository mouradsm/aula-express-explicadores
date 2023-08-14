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
    const name = req.query.name;

    let condition = name ? { name: { [Op.like]: `%${name}%` } } : null

    User.findAll({ where: condition })
        .then(data => {
            res
                .status(200)
                .send({
                    count: data.length,
                    data: data
                })
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
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(occ => {
            if (occ == 1) {
                res.send({
                    message: "O usuário foi deletado com sucesso."
                });
                return;
            }

            res.send({
                message: `Não foi possível deletear o usuário. O id ${id} não foi encontrado.`
            });
        }).catch(err => {
            res
                .status(500)
                .send({
                    message: `Não foi possível deletear o usuário com id: ${id}`

                })
        })
}

exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(count => {
            res.send({
                message: `${count} usuários foram removidos.`
            })
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Não foi possível deletar os usários."
                })
        })
}
