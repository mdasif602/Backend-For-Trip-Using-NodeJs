const {CreateNewAdventureDetailsInDbService} = require("../service/AdventureDetail.Service")

const httpStatus = require("http-status")

async function CreateNewAdventureDetailsController (request, response) {
     try {
          const {adventureid : adventureId} = request.query 
          const {subtitle, description, slots} = request.body 

          const modifiedDateSlots = slots.map((element) => {
               const [day, month, year] = element.date.split("-").map(Number)
               const date = new Date(Date.UTC(year, month - 1, day))

               return {
                date, 
                numberOfPerson : element.numberOfPerson
               }
          })

          const result = await CreateNewAdventureDetailsInDbService(adventureId, subtitle, description, modifiedDateSlots)

          if(result.success){
  
              response.status(httpStatus.CREATED).json({
                  success : true,
                  data : result.data
              })
            }
            else{
                throw new Error("CreateNewAdventureDetailController unable to create new adventure detail")
            }
     } catch (error) {
        console.log(error)
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Something Went wrong"
        })
     }
}

module.exports = {CreateNewAdventureDetailsController}