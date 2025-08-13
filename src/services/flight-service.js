const {FlightRepository} =  require("../repositories") ;
const flightRepository = new FlightRepository() ;
const {AppError} = require('../utils/errors')
const {StatusCodes} = require('http-status-codes');
const {SuccessResponse,ErrorResponse} = require('../utils/common')
const {compareTime} = require("../utils/helpers")
const {Op} = require("sequelize")
async function createFlight(data){
     try{   
              const f = compareTime(data.departureTime,data.arrivalTime) ;
              console.log(f) ;
              if( !f ){
                     throw new AppError("Arrival time is earlier the departure time",StatusCodes.BAD_REQUEST) ;
              }
            const flight = await flightRepository.create(data) ;
            return flight ;
     } catch(error){
       console.error(error.name)
       if( error.name == "SequelizeValidationError"){
              let explanation=[] ;
              error.errors.forEach((err)=> {
                     explanation.push(err.message) ;
              });
             // console.log(explanation) ;
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
            throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR) ;
     }
}
// all filters for flight are defined here
async function getAllFlights(query){ 
        const customFilter = {}
        let sort = [];
    if( query.trips ){
        const city = query.trips.split("-") ;
        customFilter.departureAirportId = city[0] ;
        customFilter.arrivalAirportId = city[1] ;
    }
    if( query.travellers ){
       const tr = query.travellers ;
       customFilter.totalSeats={
              [Op.gte]: tr
       }
    }
    if( query.price ){
        const prices = query.price.split("-") ;
        const min = prices[0] 
        const max = prices[1] 
        customFilter.price = {
              [Op.between] : [min ? min : 0 , max ? max : 200000]
       }
    }

    if (query.tripDate) {
    const lowDate = query.tripDate + " 00:00:00";
    const updDate = query.tripDate + " 23:59:59";
    const low = new Date(lowDate);
    const up = new Date(updDate);
    customFilter.departureTime = {
        [Op.gte]: low,
        [Op.lt]: up
    };
}
   if( query.sort ){
       const params = query.sort.split(",") ;
       const arr = params.map((arr1)=>{
              const temp = arr1.split("_") ;
               return temp ;
       })
       sort = arr ;
   }
    console.log("Filter :", customFilter) ;
   try{
        const flights  = await flightRepository.getAllFlights(customFilter,sort) ;
        return flights ;
   } 
   catch( err ){
           throw error ;
   }
}
async function getFlight(id){
        try{  
                   const flight = await flightRepository.get(id) ;
                   return flight;
              } catch(error){
                    throw  new AppError("Flight Not Available",StatusCodes.INTERNAL_SERVER_ERROR) ;
              }
}
async function updateSeats(data){
        try{  
              console.log(data)
                   const response = await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec) ;
                   return response;
              } catch(error){
                    throw  new AppError("Flight Not Available",StatusCodes.INTERNAL_SERVER_ERROR) ;
              }
}
module.exports = {
       createFlight,
       getAllFlights,
       getFlight,
       updateSeats
}