const { CreateNewAdventureInDbService, GetAllAdventureService, UpdateAdventureService, DeleteAdventureService} = require("../service/Adventure.Service")

async function CreateNewAdventureController(request, response) {
    try {
        const {id : cityId} = request.query
       const {name, images, category, duration, pricePerHead} = request.body

       const result = await CreateNewAdventureInDbService(cityId, name, images, category, duration, pricePerHead)

       if(!result.success){
            throw new Error("CreateNewAdventureInDBService failed to complete task")
        }
        response.status(201).json({
            success : true,
            data : result
        })
    } catch(error) {
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong" 
        })
    }
}

async function GetAllAdventureController(request, response) {
    try {
        const {id : userId} = request.query
        const result = await GetAllAdventureService(userId)
        
        if (result.success) {
            const DATA = result.data.map((element) => {
                const {_id, name, images, category, duration, pricePerHead} = element
                return {
                    id : _id,
                    name,
                    images,
                    category,
                    duration,
                    pricePerHead
                }
            })
            response.status(200).json({
                success: true,
                data: DATA
             })
         } else {
            throw new Error("Error")
         }
    } catch(error) {
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong" 
        })
    }
}

async function UpdateAdventureController(request, response) {
    try {
        const {id} = request.query
        const {name, category, images, duration, pricePerHead, currency} = request.body

        const data = {}

        if (name) {
            data.name = name 
        }

        if (category) {
            data.category = category
        }

        if (images) {
            data.images = images
        }

        if (duration) {
            data.duration = duration
        }

        if (pricePerHead) {
            data.pricePerHead = pricePerHead
        }

        if (currency) {
            data.currency = currency
        }

        const result = await UpdateAdventureService(id, data);

        if (result.success) {
            response.status(200).json({
                success: true,
                message : "Upadted Success"
             })
        } else {
            throw new Error("Unable to update")
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({
        success : false,
        message : "Something went wrong"
       })
    }
    
}

async function DeleteAdventureController(request, response) {
    try {
        const {id} = request.query;

        const result = await DeleteAdventureService(id);

        if (result.success) {
          response.status(200).json({
              success : true,
              message : "Delete Success"
          })
        } else {
          throw new Error("Flailed tp Dlete")
        }
  } catch (error) {
      console.log(error)
      response.status(500).json({
          success : false,
          message  : "Something went wrong"
      })
  }
}

module.exports = {CreateNewAdventureController, GetAllAdventureController, UpdateAdventureController, DeleteAdventureController}