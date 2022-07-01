const express = require('express');
const router = express.Router();
const {postproperty,getProperty,editProperty,deleteProperty,admin} = require('../controllers/properties')
const {verifyUser,verifyAdmin} = require("../utils/verifytoken")

//create property
router.post('/addproperty',verifyUser,postproperty);
//getting property with owner information
router.get('/',getProperty)
//update property
router.put('/:id',verifyUser,editProperty)
//delete property
router.delete('/:id',verifyUser,deleteProperty)




module.exports = router;