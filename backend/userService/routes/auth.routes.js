const { verifyRegister } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

app.post(
  "/auth/register",
  [
    verifyRegister.checkDuplicateUsernameOrEmail,
    verifyRegister.checkRolesExisted, 
    verifyRegister.passwordvalidation
  ], controller.register
);

app.post("/auth/login", controller.login);

app.post("/auth/logout", [verifyRegister.verifyToken], controller.logout); 

app.patch("/auth/forgotPassword", controller.forgotPassword); 

app.get("/auth/checkValidUser", controller.checkValidUserWithRefreshToken); 

app.put("/auth/resetPassword",[verifyRegister.passwordvalidation], controller.resetPassword);
};