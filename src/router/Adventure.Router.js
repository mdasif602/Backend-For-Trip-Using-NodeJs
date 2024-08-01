const express = require("express");
const { CreateNewAdventureController, GetAllAdventureController, UpdateAdventureController, DeleteAdventureController } = require("../controller/Adventure.controller");
const AdventureRouter = express.Router();

AdventureRouter.post("/add", CreateNewAdventureController)
AdventureRouter.get("/all", GetAllAdventureController)
AdventureRouter.put("/update", UpdateAdventureController)
AdventureRouter.delete("/delete", DeleteAdventureController)


module.exports = AdventureRouter