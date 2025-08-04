const {StatusCodes} = require("http-status-codes") ;
const {AppError} = require('../utils/errors')
const {ErrorResponse} = require('../utils/common')
function validateCreateRequest(req,res,next){
     if( !req.body.name){
        ErrorResponse.error = new AppError("name not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     if( !req.body.code){
        ErrorResponse.error = new AppError("code not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     if( !req.body.cityId){
        ErrorResponse.error = new AppError("cityId not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     next() ;
}
module.exports={
    validateCreateRequest
}