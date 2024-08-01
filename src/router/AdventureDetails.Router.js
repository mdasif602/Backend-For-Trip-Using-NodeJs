const express = require("express")
const {CreateNewAdventureDetailsController} = require("../controller/AdventureDetails.controller")
const AdventureDetailsRouter = express.Router();

AdventureDetailsRouter.post("/add", CreateNewAdventureDetailsController)


module.exports = AdventureDetailsRouter