const mongoose = require("mongoose");
const url ='mongodb://localhost:27017/testingDb';


const connection = async () =>{
    try{
        mongoose.connect(url,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        console.log("Connection Sucess MongoDb")
    }catch(error){
        console.log('failed' + err)
    }
}
module.exports = connection;