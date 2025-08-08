const {StatusCodes} = require("http-status-codes") ;
const {AppError} = require('../utils/errors')
const {ErrorResponse} = require('../utils/common')
  /*
      flightNumber , airplaneId , departureAirportId,  arrivalAirportId , 
      arrivalTime , departureTime , price , boardingGate , totalSeats
   */
function validateCreateRequest(req,res,next){
    console.log(req.body.name) ;
     if( !req.body.flightNumber ){
        ErrorResponse.error = new AppError("flightNumber  not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     if( !req.body.airplaneId ){
        ErrorResponse.error = new AppError("airplaneId not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     if( !req.body.departureAirportId ){
        ErrorResponse.error = new AppError("departureAirportId not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     if( !req.body.arrivalAirportId ){
        ErrorResponse.error = new AppError("arrivalAirportId not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     if( !req.body.arrivalTime ){
        ErrorResponse.error = new AppError("arrivalTime not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     if( !req.body.departureTime ){
        ErrorResponse.error = new AppError("departureTime not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     if( !req.body.price ){
        ErrorResponse.error = new AppError("price not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     if( !req.body.totalSeats ){
        ErrorResponse.error = new AppError("totalSeats not found on incoming request",StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
     }
     next() ;
}
module.exports={
    validateCreateRequest
}