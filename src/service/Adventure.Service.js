const AdventureModel = require("../model/Adventure.Model");

async function CreateNewAdventureInDbService(
    cityId,
    name,
    images,
    category,
    duration,
    pricePerHead
) {
    try {
        const result = await AdventureModel.create({
            cityId,
            name,
            images,
            category,
            duration,
            pricePerHead,
        });
        if (result) {
            return {
                success: true,
                data: result
            }
        } else {
            throw new Error("Something went wrong");
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
}

async function GetAllAdventureService(cityId) {
    try {
        const result = await AdventureModel.find({cityId})
        if (result) {
            return {
                success : true, 
                data : result
            }
        } else {
            throw new Error("Error")
        }
    } catch(error) {
        console.log(error)
        return {
            success: false
        }
    }
}

async function UpdateAdventureService(id, data) {
    try {
        const {name, category, images, duration, pricePerHead, currency} = data;
        const adventureDocument = await AdventureModel.findById(id);
  
        if (name) {
          adventureDocument.name = name;
        }
  
        if (category) {
          adventureDocument.category = category
        }
  
        if (images) {
          adventureDocument.images = images
        }
  
        if (duration) {
          adventureDocument.duration = duration
        }
  
        if (pricePerHead) {
          adventureDocument.pricePerHead = pricePerHead
        }
  
        if (currency) {
          adventureDocument.currency = currency
        }
  
        const result = await adventureDocument.save();
  
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

async function DeleteAdventureService(id) {
    try {
        const result = await AdventureModel.findByIdAndDelete(id);

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
module.exports = { CreateNewAdventureInDbService, GetAllAdventureService, UpdateAdventureService,   DeleteAdventureService };