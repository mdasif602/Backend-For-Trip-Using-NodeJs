const UserModel = require("../model/User.Model")

async function CreateNewUserInDbService(name, email, encryptedPassword) {
      try {
          const result = await UserModel.create({
            name,
            email,
            password : encryptedPassword
          })
          if (result) {
            return {
                success: true,
                data: result
            }
        } else {
            throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(error)
        return {
            success : false,
        }
      }
}

module.exports = {CreateNewUserInDbService}