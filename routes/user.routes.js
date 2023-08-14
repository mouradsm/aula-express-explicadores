module.exports = app => {

    const users = require("../controllers/user.controller.js")


    var router = require("express").Router();

    router.post("/", users.create);

    router.get("/", users.findAll);

    router.get("/:id", users.findOne)

    router.put('/:id', users.update)



    app.use('/api/users', router)

}