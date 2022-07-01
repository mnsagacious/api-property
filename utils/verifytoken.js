const jwt = require('jsonwebtoken')
const createError = require('./error')

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token) {
//       return next(createError.createError(401, "You are not authenticated!"));
//     }
  
//     jwt.verify(token, process.env.jwtkey, (err, user) => {
//       if (err) return next(createError.createError(403, "Token is not valid!"));
//       req.user = user;
//       next();
//     });
//   };
  
const verifyToken = (req,res,next)=>{
    
    //verify authentication
    //req.body .access_token => token name
   const  token = req.cookies.access_token;
   console.log(req.cookies.access_token ,"token");
   if(!token){ return next(createError.createError(401,"You are not Authenticated"))}
   //if token found then checking the validity of token !
   
   jwt.verify(token,process.env.jwtkey,(err,user)=>{
    //the third paremeter is returning us an error or user information
    if(err) return next(createError.createError(403,"Token is not valid"));
     //if everything is okay then setting new request property
     //req.user mean you can write anything with req.(any name) and = user <= coming from user parameter  
     req.user = user;
     //req.user = user => this will store our information user id and isAdmin 
     //that we pass while generating token
     //if every thing work fine then it will go to next operation
     next()
   })

}
// const verifyUser = (req, res, next) => {
//     verifyToken(req, res, next, () => {
//       if (req.user.id === req.params.id || req.user.isAdmin) {
//         next();
//       } else {
//         return next(createError.createError(403, "You are not authorized!"));
//       }
//     });
//   };
const verifyUser = (req,res,next)=>{

    verifyToken(req,res,next,()=>{
        //this req.user.isAdmin is comming from verifytoken code
        if(req.body.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            next(createError.createError(403,"please Logged in"))
        }
    })

}

const verifyAdmin = (req,res,next) =>{

    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
           
            next();
        }
        else{
            next(createError.createError(403,"You are unauthorized"))
        }
    })

}
module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin,
}