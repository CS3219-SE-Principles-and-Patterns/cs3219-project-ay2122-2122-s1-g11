const express = require('express');
const bodyParser = require("body-parser"); 
const cors = require("cors"); 
const app = express(); 
const dotenv = require('dotenv'); 
dotenv.config();
var common = require("./routes/common"); 
var config = common.config(); 

var corsOptions = {
    origin: "http://localhost:4001"
}; 

app.use(cors()); 

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({extended: true})); 

const db = require("./models");
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

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// const hostname = config.url; 
const PORT = process.env.PORT || 4000; 
module.exports = app.listen(PORT, () => {
    console.log(`Server listening on port 4000!`); 
});  
