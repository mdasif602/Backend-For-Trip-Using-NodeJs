const express = require("express");
const { CreateNewCityConytoller, GetAllCityController, UpdateCityController, DeleteCityController } = require("./../controller/City.controller")
const {AdminAuthorizationMiddleware, CustomerAuthorizationMiddleWare} = require("../middlewares/Authorization.middleware")
const CityRouter = express.Router();

CityRouter.post("/add", AdminAuthorizationMiddleware, CreateNewCityConytoller)
CityRouter.get("/all", CustomerAuthorizationMiddleWare, GetAllCityController)
CityRouter.put("/update", AdminAuthorizationMiddleware, UpdateCityController)
CityRouter.delete("/delete", AdminAuthorizationMiddleware, DeleteCityController)
                                         
module.exports = CityRouter;