const CityModel = require('../model/City.model')

async function CreateNewCityInDBService(name, image, description, cuisines){
    try{

        const result = await CityModel.create({
            name,
            image,
            description,
            cuisines  
        })

        if(result){
            return {
                success : true,
                data : result
            }
        }

    }catch(error){
        console.log(error)
        return {
            success : false
        }
    }
}

async function GetAllCityService() {
    try {
        const result = await CityModel.find();
        if (result) {
            return {
                success : true, 
                data : result
            }
        } else {
            throw new Error("Error")
        }
    } catch (error) {
        console.log(error)
        return {
            success: false
        }
    }
    
}

async function UpdateCityService(cityId, data) {
    try {
         const {name, description, cuisines, image} = data;
         const cityDocument = await CityModel.findById(cityId);

         if (name) {
            cityDocument.name = name;
         }

         if (description) {
            cityDocument.description = description;
         }

         if (cuisines) {
            cityDocument.cuisines = cuisines
         }

         if (image) {
            cityDocument.image = image
         }

         const result = await cityDocument.save();
         if (result) {
            return {
                success : true,
                data : result
            }
         } else {
            throw new Error(`Not able to update the data of id ${cityId}`)
         }
    } catch(error) {
        console.log(error)
        return {
            success : false,
            message : "from db service"
        }
    }
}


async function DeleteCityService(cityId) {
    try {
         const result = await CityModel.findByIdAndDelete(cityId);

         if (result) {
            return {
                success : true,
                messgae : "Success Delete"
            }
         } else {
            throw new Error("Not Able to Delete");
         }
    } catch(error) {
        console.log(error);
        return {
            success : false,
            message : "from Service"
        }
    }
}

module.exports = {
    CreateNewCityInDBService, GetAllCityService, UpdateCityService, DeleteCityService
}