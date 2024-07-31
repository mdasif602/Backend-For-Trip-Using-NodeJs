const express = require("express");
const { CreateNewAdventureController, GetAllAdventureController } = require("../controller/Adventure.controller");

const AdventureRouter = express.Router();

AdventureRouter.post("/add", CreateNewAdventureController)
AdventureRouter.get("/all", GetAllAdventureController)


module.exports = AdventureRouter