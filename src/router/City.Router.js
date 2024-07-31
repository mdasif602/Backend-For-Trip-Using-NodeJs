const express = require("express");
const { CreateNewCityConytoller, GetAllCityController, UpdateCityController, DeleteCityController } = require("./../controller/City.controller")

const CityRouter = express.Router();

CityRouter.post("/add", CreateNewCityConytoller)
CityRouter.get("/all", GetAllCityController)
CityRouter.put("/update", UpdateCityController)
CityRouter.delete("/delete", DeleteCityController)
                                         
module.exports = CityRouter;