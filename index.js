const express = require('express');
const app = express();



const port = 3000;

const db = require("./models")
//db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

// Create Read Update Delete 

// GET	api/users - R
// GET	api/users/:id - R
// POST	api/users - C
// PUT	api/users/:id - U
// DELETE	api/users/:id - D
// DELETE	api/users - D



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/user.routes')(app)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});