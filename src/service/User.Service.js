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

async function GetUserByEmailFromDbService(email) {
      try {
         const result = await UserModel.find({email})

         if (result.length) {
          return {
            success : true,
            data : result[0]
          }
         } else {
            // throw new Error("GetUserByEmailFromDbService unable to find a user")
            return {
              success : false,
              data : "Invalid credentials"
            }
         }
      } catch(error) {
         console.log(error)
         return {
            success : false
         }
      }
}

async function GetUserByUserIdFromDbService(userId) {
  try {
     const result = await UserModel.findById(userId)

     if (result) {
      return {
        success : true,
        data : result
      }
     } else {
        // throw new Error("GetUserByEmailFromDbService unable to find a user")
        return {
          success : false,
          data : "Invalid credentials"
        }
     }
  } catch(error) {
     console.log(error)
     return {
        success : false
     }
  }
}

module.exports = {CreateNewUserInDbService, GetUserByEmailFromDbService, GetUserByUserIdFromDbService}