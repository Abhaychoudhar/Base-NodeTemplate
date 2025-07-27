//const { StatusCodes } = require("http-status-codes");
const {AirplaneRepository} =  require("../repositories") ;
const airplaneRepository = new AirplaneRepository() ;
const {AppError} = require('../utils/errors')
const {StatusCodes} = require('http-status-codes');
const {SuccessResponse,ErrorResponse} = require('../utils/common')
// this is now contacting with repositorie on behalf of the controller
// and controller contacts with the services
async function createAirplane(data){
     try{
            const airplane = await airplaneRepository.create(data) ;
            return airplane ;
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
            throw new AppError('Cannot create a new airplane object', StatusCodes.INTERNAL_SERVER_ERROR) ;
     }
}
async function getAirplanes(){
       try{
            const airplanes = await airplaneRepository.getAll() ;
            return airplanes;
       } catch(error){
             throw  new AppError("Can't get All Airplanes",StatusCodes.INTERNAL_SERVER_ERROR) ;
       }
}
async function getAirplane(id){
       try{
            const airplane = await airplaneRepository.get(id) ;
            if( !airplane ){
              throw  new AppError("Airplane Not Available",StatusCodes.INTERNAL_SERVER_ERROR) ;
            }
            return airplane;
       } catch(error){
             throw  new AppError("Airplane Not Available",StatusCodes.INTERNAL_SERVER_ERROR) ;
       }
}
async function deleteAirplane(id){
       try{
            const airplane = await airplaneRepository.destroy(id) ;
            return airplane;
       } catch(error){
             throw  new AppError("Cannot Delete",StatusCodes.BAD_REQUEST) ;
       }
}
async function updateAirplane(id,data){
       try{

            const response = await airplaneRepository.update(id,data);
            return response;
       } catch(error){
              //console.log(error.name) ;
             throw  new AppError(error.message,StatusCodes.BAD_REQUEST) ;
       }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}