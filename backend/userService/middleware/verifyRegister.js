const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
var passwordValidator = require('password-validator'); 
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

passwordvalidation = (req, res, next) => {
  var schema = new passwordValidator(); 
  schema.is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase(); 
  if (!schema.validate(req.body.password)) {
    res.status(400).send({
      message: "Password must be at least 8 characters with upper case and lowercase letters"
    }); 
    return; 
  }
  next();
};


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    req.tokenExp = decoded.exp; 
    req.token = token; 
    next();
  });
};

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
  
        next();
      });
    });
  };

  checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    next();
  };

const verifyRegister = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted, 
    passwordvalidation: passwordvalidation, 
    verifyToken: verifyToken
  };
  
module.exports = verifyRegister;
