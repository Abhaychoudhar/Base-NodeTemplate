//const { StatusCodes } = require("http-status-codes");
const {AirportRepository} =  require("../repositories") ;
const airportRepository = new AirportRepository() ;
const {AppError} = require('../utils/errors')
const {StatusCodes} = require('http-status-codes');
const {SuccessResponse,ErrorResponse} = require('../utils/common')
// this is now contacting with repositorie on behalf of the controller
// and controller contacts with the services
async function createAirport(data){
     try{   
            console.log(data) ;
            const airport = await airportRepository.create(data) ;
            return airport ;
     } catch(error){
       console.error(error.name)
       if( error.name == "SequelizeValidationError"){
              let explanation=[] ;
              error.errors.forEach((err)=> {
                     explanation.push(err.message) ;
              });
              console.log(explanation) ;
              // throwing it so that controller can catch it and give more specific error messaging
              throw new AppError(explanation,StatusCodes.BAD_REQUEST) ;
       }
       // throw just send error to the next node calling me at any such node we can define handling
            throw new AppError('Cannot create a new airport object', StatusCodes.INTERNAL_SERVER_ERROR) ;
     }
}
async function getAirports(){
       try{
            const airport = await airportRepository.getAll() ;
            return airport;
       } catch(error){
             throw  new AppError("Can't get All Airports",StatusCodes.INTERNAL_SERVER_ERROR) ;
       }
}
async function getAirport(id){
       try{
            const airport = await airportRepository.get(id) ;
            if( !airport ){
              throw  new AppError("Airport Not Available",StatusCodes.INTERNAL_SERVER_ERROR) ;
            }
            return airplane;
       } catch(error){
             throw  new AppError("Airport Not Available",StatusCodes.INTERNAL_SERVER_ERROR) ;
       }
}
async function deleteAirport(id){
       try{
            const airport = await airportRepository.destroy(id) ;
            return airport;
       } catch(error){
             throw  new AppError("Cannot Delete",StatusCodes.BAD_REQUEST) ;
       }
}
async function updateAirport(id,data){
       try{

            const response = await airportRepository.update(id,data);
            return response;
       } catch(error){
              //console.log(error.name) ;
             throw  new AppError(error.message,StatusCodes.BAD_REQUEST) ;
       }
}
module.exports = {
    createAirport,
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport
}