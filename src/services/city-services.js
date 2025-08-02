const {CityRepository} =  require("../repositories") ;
const cityRepository = new CityRepository() ;
const {AppError} = require('../utils/errors')
const {StatusCodes} = require('http-status-codes');
const {SuccessResponse,ErrorResponse} = require('../utils/common')
async function createCity(data){
     try{
            const city = await cityRepository.create(data) ;
            return city ;
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
       else if( error.name == "SequelizeUniqueConstraintError"){
           let explanation=[] ;
              error.errors.forEach((err)=> {
                     explanation.push(err.message) ;
              });
              console.log(explanation) ;
              // throwing it so that controller can catch it and give more specific error messaging
              throw new AppError(explanation,StatusCodes.BAD_REQUEST) ;
       }
       // throw just send error to the next node calling me at any such node we can define handling
            throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR) ;
     }
}
async function deleteCity(id){
       try{
              console.log(id) ;
            const airplane = await cityRepository.destroy(id) ;
            return airplane;
       } catch(error){
            //  ErrorResponse.error = error ;
            console.log(error.message) ;
            if( error.message == "Not Found" ){
              throw error ;
            }
             throw  new AppError("Cannot Delete",StatusCodes.BAD_REQUEST) ;
       }
}
async function getCity(id){
       try{
              console.log(id) ;
            const airplane = await cityRepository.get(id) ;
             if( !airplane ){
              
              throw  error ;
            }
            return airplane;
       } catch(error){
            //  ErrorResponse.error = error ;..
            console.log("here2")
             throw  new AppError("City Not Available",StatusCodes.BAD_REQUEST) ;
       }
}
async function getCities(){
       try{
            const airplanes = await cityRepository.getAll() ;
            return airplanes;
       } catch(error){
             throw  new AppError("Can't get All Airplanes",StatusCodes.INTERNAL_SERVER_ERROR) ;
       }
}
async function updateCity(id,data){
       try{

            const response = await cityRepository.update(id,data);
            return response;
       } catch(error){
              //console.log(error.name) ;
             throw  new AppError(error.message,StatusCodes.BAD_REQUEST) ;
       }
}
module.exports = {
       createCity,
       deleteCity,
       getCity,
       updateCity,
       getCities
}