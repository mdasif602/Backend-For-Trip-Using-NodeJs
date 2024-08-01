const AdventureDetailsModel = require("../model/AdventureDetails.Model")

async function CreateNewAdventureDetailsInDbService(adventureId, subtitle, description, slots) {
      try {
          const result = await AdventureDetailsModel.create({
              adventureId,
              subtitle,
              description,
              slots
          })

          if (result) {
            return {
                success : true,
                data : result
            }
          } else {
             throw new Error("CreateNewAdventureDetailsInDbService is unable to create new Adventure");
          }
      } catch (error) {
           console.log(error)
           return {
            success : false
           }
      }
}

module.exports = {CreateNewAdventureDetailsInDbService}