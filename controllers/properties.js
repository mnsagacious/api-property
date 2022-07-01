const Properties = require("../Models/properties")
const errors = require('../utils/error')
const {verifyAdmin} = require('../utils/verifytoken')
//creating property
const postproperty = async (req, res, next) => {
    try {
        const post = new Properties({
            image: req.body.image,
            propertytitle: req.body.propertytitle,
            price: req.body.price,
            propertytype: req.body.propertytype,
            city: req.body.city,
            purpose: req.body.purpose,
            location: req.body.location,
            bath: req.body.bath,
            area: req.body.area,
            rooms: req.body.rooms,
            kitchen: req.body.kitchen,
            storeroom: req.body.storeroom,
            description: req.body.description,
            owner: req.body.owner
        })
        console.log(req.body)
        await post.save()
        res.status(200).send("Property has been Listed")

    } catch (error) {
        next(error)
    }
}

//getting properties with owner information

const getProperty = async (req, res, next) => {
    try {
        console.log("getting All documents");
        const detail = await Properties.find({}).populate("owner").exec();
        // const property = await Properties.find({}).populate('owner').exe();
        detail && res.status(200).json(detail);
    } catch (error) {
        next(error)
    }
}

//edit property 
const editProperty = async (req, res, next) => {
    try {
        const property = await Properties.findById(req.params.id)
        if (String(property.owner._id) === req.body.owner || verifyAdmin)

            try {
                const updated = await Properties.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });
                updated && res.status(200).json(updated)
            } catch (error) {
                next(error)
            }
        else {
            next(errors.createError(401, "You can only update your Property"))
        }

    } catch (error) {
        next(error)
    }
}


//delete a property
const deleteProperty = async (req, res, next) => {
    try {
        const property = await Properties.findById(req.params.id);
        console.log(property)
        console.log(property.owner)       
        if (String(property.owner._id) === req.body.owner || verifyAdmin)

            try {
                const deleteProperty = await Properties.findByIdAndDelete(req.params.id)
                deleteProperty && res.status(200).json(deleteProperty)
                console.log("SuccessFully Deleted property")
            } catch (error) {
                console.log(error)
            }
        else {
            next(errors.createError(401,"you can only delete your property"))
            console.log("You can delete only your property")
        }

    } catch (error) {
        next(error)
    }

}


module.exports = {
    postproperty,
    getProperty,
    editProperty,
    deleteProperty,
   
}