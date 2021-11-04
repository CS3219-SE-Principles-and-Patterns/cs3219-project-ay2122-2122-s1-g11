const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

var server = require("../server"); 

// Test happy path to register, login and access user content. 
describe('POST /auth/register for user', function() {
    it("Should register a normal user", function (done) {
        let credentials = {
            'username' : 'karthika', 
            'email' : 'mdkkarthika@gmail.com', 
            'password' : 'TestTest'
        }
        chai.request(server)
            .post('/auth/register')
            .send(credentials)
            .end((err, res) => {
                res.should.have.status(200); 
                res.type.should.equal("application/json");
                res.body.should.have.property('message').eql("User was registered successfully!"); 
                console.log("Test user registeration"); 

                chai.request(server)
                    .post('/auth/login')
                    .send({
                        'email' : 'mdkkarthika@gmail.com', 
                        'password' : 'TestTest'
                    })
                    .end((error1, response) => {
                        console.log("Test user login"); 
                        response.body.should.have.status(200); 
                        response.type.should.equal("application/json"); 
                        response.body.should.have.property("username").eql("karthika");
                        response.body.should.have.property("email").eql("mdkkarthika@gmail.com"); 
                        response.body.should.have.property("roles").eql(["ROLE_USER"]); 
                        response.body.should.have.property("accessToken");
                        var token = respnse.body.token; 
                        
                        chai.request(server) 
                        .get("/auth/content/user")
                        .set('x-access-token', token)
                        .end(function(error, resp) {
                            resp.should.have.status(200); 
                            resp.body.should.equal("User Content."); 
                            done(); 
                        }); 
                    }); 
            }); 
    }); 
}); 

// Test happy path to admin user registeration, login & access admin content 
describe('POST /auth/register for admin', function() {
    it("Should register an admin user", function (done) {
        let credentials = {
            'username' : 'karthika123', 
            'email' : 'mdkkarthika123@gmail.com', 
            'password' : 'TestTest', 
            'roles': ["user", "admin"]
        }
        chai.request(server)
            .post('/auth/register')
            .send(credentials)
            .end((err, res) => {
                res.should.have.status(200); 
                res.type.should.equal("application/json");
                res.body.should.have.property('message').eql("User was registered successfully!"); 
                console.log("Test user registeration"); 

                chai.request(server)
                    .post('/auth/login')
                    .send({
                        'email' : 'mdkkarthika123@gmail.com', 
                        'password' : 'TestTest'
                    })
                    .end((err, response) => {
                        console.log("Test admin user login"); 
                        response.body.should.have.status(200); 
                        response.type.should.equal("application/json"); 
                        response.body.should.have.property("username").eql("karthika123");
                        response.body.should.have.property("email").eql("mdkkarthika123@gmail.com"); 
                        response.body.should.have.property("roles").eql(["ROLE_USER", "ROLE_ADMIN"]); 
                        response.body.should.have.property("accessToken");
                        var token = respnse.body.token; 
                        
                        chai.request(server) 
                        .get("/auth/content/admin")
                        .set('x-access-token', token)
                        .end(function(error, resp) {
                            resp.should.have.status(200); 
                            resp.body.should.equal("Admin Content."); 
                            done(); 
                        }); 
                    }); 
            }); 
    }); 
});


// Test registeration with unacceptable password
describe('POST /auth/register with unacceptable password', function() {
    it("Should not accept passwords that do not meet requirement", function (done) {
        let credentials = {
            'username' : 'karthika', 
            'email' : 'mdkkarthika@gmail.com', 
            'password' : 'test'
        }
        chai.request(server)
            .post('/auth/register')
            .send(credentials)
            .end((err, res) => {
                res.should.have.status(400); 
                res.type.should.equal("application/json");
                res.body.should.have.property('message').eql("Password must be at least 8 characters with upper case and lowercase letters"); 
                console.log("Password does not meet the requirement"); 
                done(); 
            }); 
    }); 
}); 


// Registeration and login passwords do not match 
describe('POST /auth/register with password that does not match', function() {
    it("Should not login a user whose password does not match", function (done) {
        let credentials = {
            'username' : 'karthika', 
            'email' : 'mdkkarthika@gmail.com', 
            'password' : 'TestTest'
        }
        chai.request(server)
            .post('/auth/register')
            .send(credentials)
            .end((err, res) => {
                res.should.have.status(200); 
                res.type.should.equal("application/json");
                res.body.should.have.property('message').eql("User was registered successfully!"); 
                console.log("Test user registeration"); 

                chai.request(server)
                    .post('/auth/login')
                    .send({
                        'email' : 'mdkkarthika@gmail.com', 
                        'password' : 'test'
                    })
                    .end((error, response) => {
                        console.log("User should not be logged in"); 
                        response.body.should.have.status(401); 
                        response.type.should.equal("application/json"); 
                        response.body.should.have.property("message").eql("Invalid Password!");
                        done(); 
                    }); 
            }); 
    }); 
}); 


// User already registered. 
describe('POST /auth/register with user already registered', function() {
    it("Should not register already registered user", function (done) {
        let credentials = {
            'username' : 'karthika', 
            'email' : 'mdkkarthika@gmail.com', 
            'password' : 'TestTest'
        }
        chai.request(server)
            .post('/auth/register')
            .send(credentials)
            .end((err, res) => {
                res.should.have.status(200); 
                res.type.should.equal("application/json");
                res.body.should.have.property('message').eql("User was registered successfully!"); 
                console.log("Test user registeration"); 

                chai.request(server)
                    .post('/auth/register')
                    .send(credentials)
                    .end((error, response) => {
                        console.log("User already registered"); 
                        response.body.should.have.status(400); 
                        response.type.should.equal("application/json"); 
                        response.body.should.have.property("message").eql("Failed! Username is already in use!");
                        done(); 
                    }); 
            }); 
    }); 
}); 

// Role does not exists 
describe('POST /api/auth/register with invalid role', function() {
    it("Should not accept invalid roles", function (done) {
        let credentials = {
            'username' : 'karthika', 
            'email' : 'mdkkarthika@gmail.com', 
            'password' : 'test', 
            'roles': ["user", "bye"]
        }
        chai.request(server)
            .post('/auth/register')
            .send(credentials)
            .end((err, res) => {
                res.should.have.status(400); 
                res.type.should.equal("application/json");
                res.body.should.have.property('message').eql("Failed! Role does not exist = bye"); 
                console.log("Password does not meet the requirement"); 
                done(); 
            }); 
    }); 
}); 

// Happy Path for forgot & reset password. 
describe('Forgot Password', function() {
    it("Should allow user to reset password", function (done) {
        let credentials = {
            'username' : 'karthika', 
            'email' : 'mdkkarthika@gmail.com', 
            'password' : 'TestTest'
        }
        chai.request(server)
            .post('/auth/register')
            .send(credentials)
            .end((err, res) => {
                res.should.have.status(200); 
                res.type.should.equal("application/json");
                res.body.should.have.property('message').eql("User was registered successfully!"); 
                console.log("Test user registeration"); 

                chai.request(server)
                    .post('/auth/login')
                    .send({
                        'email' : 'mdkkarthika@gmail.com', 
                        'password' : 'TestTest'
                    })
                    .end((error1, response) => {
                        console.log("Test user login"); 
                        response.body.should.have.status(200); 
                        response.type.should.equal("application/json"); 
                        response.body.should.have.property("username").eql("karthika");
                        response.body.should.have.property("email").eql("mdkkarthika@gmail.com"); 
                        response.body.should.have.property("roles").eql(["ROLE_USER"]); 
                        response.body.should.have.property("accessToken");
                        var token = respnse.body.token; 
                        
                        chai.request(server) 
                        .patch("/auth/forgotPassword")
                        .set('x-access-token', token)
                        .send({
                            'email' : 'mdkkarthika@gmail.com'
                        })
                        .end(function(error, resp) {
                            resp.should.have.status(200); 
                            resp.should.have.property("message").eql("Check your email"); 
                            resp.should.have.property("token")
                            var resetToken = resp.body.token; 

                            chai.request(server)
                            .put("/auth/resetPassword")
                            .query({token: resetToken})
                            .send({
                                "password" : "NewTestTest"
                            })
                            .end(function(error, respon) {
                                respon.should.have.status(200)
                                respon.should.have.property("message").eql("Password updated"); 
                                done(); 
                            })
                        }); 
                    }); 
            }); 
    }); 
}); 

