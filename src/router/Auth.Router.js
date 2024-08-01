const express = require("express")

const { CreateNewUserController } = require("../controller/User.controller")

const AuthRouter = express.Router();

AuthRouter.post("/signup", CreateNewUserController);

module.exports = AuthRouter