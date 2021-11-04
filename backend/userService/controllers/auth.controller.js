const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
var common = require("../routes/common"); 
var node_env = common.config(); 

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const resetSecret = 'Fn4AvqVAcxYSRp70HZijedbhPpKIPh3L7OBnYzCumag1p5wT8DgV6piG6Wfe0tr'

exports.register = (req, res) => { 
    // Save User to Database
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
      .then(user => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          });
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.login = (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found. Please register." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          algorithm: "HS256",
          expiresIn: 3600 // 1hour to make the token short-lived
        });
        var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.logout = (req, res) => {

  const {userId, token, tokenExp } = req; 
  console.log("req: ", req);
  console.log('token: ', token);
  console.log('token Exp: ', tokenExp);
  // We have to delete the JWT token from the headers but unfortunately we don't have 
  // such option to delete the JWT token from the headers. Hence we will replace the JWT
  // token with a blank string which is going to expire in 1 second. 
  var newtoken = jwt.sign(userId, "", {expiresIn: 1} , (logout, err) => {
        if (logout) {
          res.send({message: 'You have been logged out', userId}); 
          // Frontend: Make desirable redirect say /home
        } else {
          res.send({message: 'Error with logging out'}); 
        }
      });
};

exports.forgotPassword =  (req, res) => {
  try {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      } else {
        const token = jwt.sign({ id: user.id }, resetSecret, {
          algorithm: "HS256",
          expiresIn: 600 // 10mins
        });
        user.update({resetLink: token})
        sendEmail(user, token)
        return res.status(200).json({message: "Check your email"}); 
      }
    })
  } catch(error) {
    res.status(500).json({message: error.message}); 
  }
}; 

exports.checkValidUserWithRefreshToken = (req, res) => {
  try{ 
    console.log('token: ', req.query.token);
    User.findOne({
      where : {
        resetLink: req.query.token 
      } 
    }).then(user => {
      if (!user) {
        return res.status(404).send({message: "User Not Found"}); 
      } else {
        jwt.verify(req.query.token, resetSecret, (error, decoded) => {
          if (error) {
            res.status(401).send({message: 'Incorrect Token or expired'}); 
          }
          req.userId = decoded.id; 
        })
        return res.status(200).send({message: "User is valid", user: user}); 
      }
    })
  } catch(error) {
    res.status(500).send({message: error.message});
  }
}; 

exports.resetPassword = (req, res) => {
  try {
    User.findOne({
      where : {
        resetLink: req.query.token
      }
    }).then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found"});
      } else {
        jwt.verify(req.query.token, resetSecret, (error, decoded) => {
          if (error) {
            res.status(401).json({message: 'Incorrect Token or expired'}); 
          }
          req.userId = decoded.id;
          // next(); 
        })
        const hashPassword = bcrypt.hashSync(req.body.password, 8)
        newPassword = hashPassword; 
        user.update({password: newPassword, resetLink: ''})
        return res.status(200).json({message: 'Password updated'}); 
      } 
    }).catch(error => {
      console.log(error);
    })
  } catch (error) {
    res.status(500).send({message: error.message});
  }
}; 

function sendEmail(user, token) {
  try {
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'peerprepproject@gmail.com',
              pass: 'PeerPrepProject'
          },
      });
      const link = `http://${node_env.frontend}/resetPassword?token=${token}`
      transporter.sendMail({
          from: 'peerprepproject@gmail.com',
          to: user.email,
          subject: "Reset password requested",
          text: `Please follow this link to reset your password: \n` + link + `\n \n This link will be valid for 10 minutes only.`
      });

      console.log("email sent sucessfully to " + user.email);
  } catch (error) {
      console.log(error, "email not sent");
  }
}