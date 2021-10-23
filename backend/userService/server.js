const express = require('express');
const bodyParser = require("body-parser"); 
const cors = require("cors"); 
const app = express(); 

var corsOptions = {
    origin: "http://localhost:4001"
}; 

app.use(cors()); 

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({extended: true})); 

const db = require("../userService/models");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });

app.get("/", (req, res) => {
    res.json({message: "Hello there."}); 
}); 

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "admin"
    });
  }

require('../userService/routes/auth.routes')(app);
require('../userService/routes/user.routes')(app);

const PORT = process.env.PORT || 4000; 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
}); 
