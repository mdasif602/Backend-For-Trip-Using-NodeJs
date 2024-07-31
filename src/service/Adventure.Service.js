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
module.exports = { CreateNewAdventureInDbService, GetAllAdventureService };