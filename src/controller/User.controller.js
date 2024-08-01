const {CreateNewUserInDbService} = require("../service/User.Service")

const httpStatus = require("http-status")
const bcrypt = require("bcrypt")

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


module.exports = {CreateNewUserController}