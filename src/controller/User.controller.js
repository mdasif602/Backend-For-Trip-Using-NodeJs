const {CreateNewUserInDbService, GetUserByEmailFromDbService} = require("../service/User.Service")
require('dotenv').config();
const httpStatus = require("http-status")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

async function CreateNewUserController (request, response) {
    try {
        const {name, email, password} = request.body

        if (!name || !email || !password) {
            response.status(httpStatus.BAD_REQUEST).json({
                success : false,
                message : "Name, Email and Password is required"
            })
            return
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        
        const result = await CreateNewUserInDbService(name, email, encryptedPassword)
        
        if (result) {
            response.status(201).json({
                success : true
            })
        } else {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success : false,
                message : "Sonething went wrong"
            })
        }
    } catch(error) {
        console.log(error)
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Sonething went wrong"
        })
    }
}

async function SigninUserController (request, response) {
    try {
          const {email, password} = request.body
          if (!email || !password) {
            // response.status(httpStatus.BAD_REQUEST).json({
            //     success : false,
            //     message : "Email and Password are required"
            // })
            // return
            const err = new Error("Email & password are required")
            err.status = httpStatus.BAD_REQUEST
            throw err
          }
          //Step - 1 : We have to verify the username and password
          const UserResult = await GetUserByEmailFromDbService(email)
          
          if (!UserResult.success) {
            const err = new Error("Invalid Credentials")
            err.status = httpStatus.BAD_REQUEST
            throw err
          }
          
          //Password
          const {password : encryptedPassword, _id : userId} = UserResult.data
          const PasswordCompareResult = bcrypt.compareSync(password, encryptedPassword)

        //   if (PasswordCompareResult) {
        //     console.log("Password match")

        //   } else {
        //     console.log("Password differ")
        //   }

          if(!PasswordCompareResult){
                const err = new Error("Invalid Email or Password")
                err.status = httpStatus.BAD_REQUEST
                throw err
            }
          //Step - 2 : We will generate the token and will send back to client

          const PAYLOAD = {
            userid : userId
          }

          const token = jwt.sign(PAYLOAD, JWT_SECRET_KEY, {expiresIn : '1h'})
          response.status(httpStatus.CREATED).json({
            success : true,
            token
          })

    } catch(error) {
          console.log(error)
        //   response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        //     success : false,
        //     message : "Something went wrong"
        //   })
        response.status(error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : error.status ? error.message : "Something went wrong"
        })
    }
}


module.exports = {CreateNewUserController, SigninUserController}