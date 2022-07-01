const Users = require("../Models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createError = require("../utils/error")
 const  register = async(req,res,next)=>{
    //hashing our password
    try{
       const salt = bcrypt.genSaltSync(10);
       const hashpassword = bcrypt.hashSync(req.body.password,salt);
       //creating user
       const newUser = new Users({
        fullname:req.body.fullname,
        username:req.body.username,
        email:req.body.email,
        password:hashpassword,
        isAdmin:req.body.isAdmin
       })
       await newUser.save();
       res.status(200).send("User has been created")

    }catch(error){
      next(error);
    }

}
const login = async(req,res,next)=>{
    try{
        const user = await Users.findOne({
            username:req.body.username
        })
        console.log(user,"user");
        //custom error 
        if(!user){  return next(createError.createError(404, "User not found!"));}
      
        //password comparret
        const comparePassword = await bcrypt.compare(req.body.password,user.password)
        if(!comparePassword){
            return next(createError.createError(400, "Wrong password or username!"));
           
        }
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin} ,process.env.jwtkey)
        const {password,isAdmin, ...otherdetails} = user._doc
         res.cookie("access_token",token,{
         //we do http only because it does not allow any client secret to reach that cookie
         
            httpOnly:true
        }).status(200).json({ details: { ...otherdetails },isAdmin});

    }catch(error){
        next(error);
    }

}


// const login = (req,res)=>{
//     const user = Users.findOne({
//         username:req.body.username
//     })
//     if(!user){
//         return res.status(404).json({ emailnotfound: "Email not found" });
//     }
//     //password check 
//     const checkpass = bcrypt.compareSync(req.body.password,user.password);
//     if(!checkpass){
//         return res.status(404).json({wrong:"Wrong Credientials"})
//     }
// }
// const login = (req,res)=>{
//     const username = req.body.username;
//     const password = req.body.password;
//     // Find user by email
//       Users.findOne({ username }).then((user) => {
//       // Check if user exists
//       if (!user) {
//         return res.status(404).json({ emailnotfound: "Email not found" });
//       }
//       // Check password
//       bcrypt.compare(password, user.password).then((isMatch) => {
//         if (isMatch) {
//           // User matched
  
//           return res.send('login successful')
        
//         } else {
//           return res
//             .status(400)
//             .json({ passwordincorrect: "Password incorrect" });
//         }
//     })

// }
    
 
// )}
  
  

 
  
module.exports = {
    register,
    login
}