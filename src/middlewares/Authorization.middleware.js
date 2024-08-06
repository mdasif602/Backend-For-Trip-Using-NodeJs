const httpStatus = require("http-status")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const {GetUserByUserIdFromDbService} = require("../service/User.Service")

async function AdminAuthorizationMiddleware(request, response, next) {
    try {
        // const {} = request
        // console.log("admin role")
        const token = request.headers.authorization.split(" ")[1]
        // console.log(token)
        const payload = jwt.verify(token, JWT_SECRET_KEY)
        // console.log(payload)
       
        const {userid : userId} = payload
        const result = await GetUserByUserIdFromDbService(userId)
        // console.log("hello", result)
        if (!result.success) {
            throw new Error()
        }

        const {role} = result.data 
        // console.log(role)
        if (role === "admin") {
            next()
        } else {
            throw new Error()
        }
    } catch(error) {
        // console.log(error)
        response.status(error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR).json({
        success : false,
        message : error.status ? error.message : "Something went wrong"
      })
    }
}

async function CustomerAuthorizationMiddleWare(request, response, next) {
    try {
         const token = request.headers.authorization.split(" ")[1]
         const payload = jwt.verify(token, JWT_SECRET_KEY)

         const {userid : userId} = payload
        const result = await GetUserByUserIdFromDbService(userId)
        if (!result.success) {
            throw new Error()
        }
        next()
    } catch (error) {
        response.status(error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false, 
            message : error.status ? error.message : "Something went wrong"
        })
    }
}


module.exports = {AdminAuthorizationMiddleware, CustomerAuthorizationMiddleWare}