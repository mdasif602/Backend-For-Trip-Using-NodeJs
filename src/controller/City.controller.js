const {CreateNewCityInDBService, GetAllCityService, UpdateCityService, DeleteCityService} = require("./../service/City.Service")

async function CreateNewCityConytoller(request, response){
    try{

        const { name, description, image, cuisines} = request.body

        const result = await CreateNewCityInDBService(name, image, description, cuisines)

        if(!result.success){
            throw new Error("CreateNewCityInDBService failed to complete task")
        }

        response.status(201).json({
            success : true,
            data : result
        })

    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong" 
        })
    }
}

async function GetAllCityController(request, response) {
    try {
         const result = await GetAllCityService();

         if (result.success) {
            const DATA = result.data.map((element) => {
                const {_id, name, description, cuisines, image} = element
                return {
                    id : _id,
                    name,
                    description,
                    cuisines,
                    image
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

async function UpdateCityController(request, response) {
   try {
        const {id : cityId} = request.query 
        const {name, description, cuisines, image} = request.body
        const data = {}
        
        if (name) {
            data.name = name;
        }
        if (description) {
            data.description = description
        }
        if (cuisines) {
            data.cuisines = cuisines
        }
        if (image) {
            data.image = image
        }

        const result = await UpdateCityService(cityId, data);

        if (result.success) {
            response.status(200).json({
                success: true,
                message : "Upadted Success"
             })
        } else {
            throw new Error("Failed tp update city")
        }
   } catch (error) {
        console.log(error)
        response.status(500).json({
        success : false,
        message : "Something went wrong"
    })
   }
}

async function DeleteCityController(request, response) {
    try {
          const {id : cityId} = request.query;

          const result = await DeleteCityService(cityId);

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

module.exports = {
    CreateNewCityConytoller, GetAllCityController, UpdateCityController, DeleteCityController
}