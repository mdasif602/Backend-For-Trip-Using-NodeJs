const express = require("express")
require('dotenv').config()
require('./src/db/connect')

const CityRouter = require("./src/router/City.Router");
const AdventureRouter = require("./src/router/Adventure.Router");
const AdventureDetailsRouter = require("./src/router/AdventureDetails.Router")
const AuthRouter = require("./src/router/Auth.Router")

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

const server = express()

server.use(express.json())

server.use("/cities", CityRouter);
server.use("/adventure", AdventureRouter);
server.use("/adventures/detail", AdventureDetailsRouter)
server.use("/auth", AuthRouter)
server.use("*", (request, response) => {
    response.status(404).json({
        success : false,
        message : 'API ENDPOINT NOT FOUND'
    })
})

server.listen(PORT, ()=>{
    console.log(`Server started successfully in ${NODE_ENV} at PORT - ${PORT}`)
})