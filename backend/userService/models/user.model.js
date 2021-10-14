module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }, 
      resetLink: {
        type: Sequelize.STRING, 
        default: ''
      }
    });
    return User;
  };