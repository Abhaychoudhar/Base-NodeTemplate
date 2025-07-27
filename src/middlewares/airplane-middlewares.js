const {StatusCodes} = require("http-status-codes") ;
const {AppError} = require('../utils/errors')
const {ErrorResponse} = require('../utils/common')
function validateCreateRequest(req,res,next){
     if( !req.body.modelNumber){
        ErrorResponse.error = new AppError("Model number not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     next() ;
}
module.exports={
    validateCreateRequest
}