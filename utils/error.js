const createError = (status,message)=>{
    console.log("i am create error")
    const error = new Error;
    error.status = status;
    error.message = message;
    return error;

}
module.exports = {createError}