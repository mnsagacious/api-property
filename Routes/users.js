const express = require("express");
const verifyToken = require('../utils/verifytoken')
const verifyUser = require('../utils/verifytoken')
const verifyAdmin = require('../utils/verifytoken')
const router = express.Router();
const {updateUser,deleteUser,getUser,getUsers} = require("../controllers/users")

// when ever eny one reach this route verifytoken run first then go to req,res,next
// router.get('/checkauthentication',verifyToken.verifyToken,(req,res,next)=>{
//     res.send("hello you are logged in")
    
// })
// router.get('/checkuser/:id',verifyUser.verifyUser, (req,res,next)=>{
//    res.send("you are loggedin and you can delete your account")
// })

// router.get('/checkAdmin',verifyAdmin.verifyAdmin,(req,res,next)=>{
//     res.send("hello admin you can delete all ACCOUNTS")
// })
//update a user
router.put('/:id',verifyUser.verifyUser,updateUser);

//delete a user 
router.delete('/:id',verifyUser.verifyUser,deleteUser);

//get a single user
router.get('/:id',verifyUser.verifyUser,getUser)

//get all users
router.get('/',verifyAdmin.verifyAdmin,getUsers)

module.exports = router;