const express = require("express")

const { CreateNewUserController, SigninUserController } = require("../controller/User.controller")

const AuthRouter = express.Router();

AuthRouter.post("/signup", CreateNewUserController);
AuthRouter.post("/signin", SigninUserController);

module.exports = AuthRouter