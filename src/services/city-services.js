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
module.exports = {createCity}