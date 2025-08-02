const {StatusCodes} = require("http-status-codes") ;
const {AppError} = require('../utils/errors')
const {ErrorResponse} = require('../utils/common')
function validateCreateRequest(req,res,next){
    console.log(req.body.name) ;
     if( !req.body.name ){
        ErrorResponse.error = new AppError("City name not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     next() ;
}
module.exports={
    validateCreateRequest
}