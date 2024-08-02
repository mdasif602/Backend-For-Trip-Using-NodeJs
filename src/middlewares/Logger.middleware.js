const httpStatus = require("http-status")
const fs = require('fs')

async function RequestPathAndMethodLoggerMiddleware(request, response, next) {
   try {

       const {method, path} = request
      //  console.log(method, path)
       const log = `Timestamp : ${new Date()} Path - ${path} Method - ${method}\n`
       fs.appendFileSync('request.log.txt', log, 'utf-8')
       next()

   } catch(error) {

      console.log(error)
      response.status(error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR).json({
        success : false,
        message : error.status ? error.message : "Something went wrong"
      })

   }
}

module.exports = {RequestPathAndMethodLoggerMiddleware}