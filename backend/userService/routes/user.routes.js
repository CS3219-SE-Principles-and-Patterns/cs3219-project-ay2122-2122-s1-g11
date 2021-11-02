const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/auth/content/all", controller.allAccess);
  
    app.get(
      "/auth/content/user",
      [authJwt.verifyToken],
      controller.userBoard
    );
  
    app.get(
      "/auth/content/admin",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminBoard
    );
  };
