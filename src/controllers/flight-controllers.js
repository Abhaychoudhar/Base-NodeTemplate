const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const {AppError} = require("../utils/errors")

async function createFlight(req, res) {
    try {
        const flightData = {
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            totalSeats: req.body.totalSeats
        };
  //console.log(flightData)
        const flight = await FlightService.createFlight(flightData);
        SuccessResponse.data = flight;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function getAllFlights(req,res){
    try{
        // console.log(req.query) ;
        const flights = await FlightService.getAllFlights(req.query) ;
        SuccessResponse.message = flights ;
        return res.status(StatusCodes.ACCEPTED).json(SuccessResponse); 
    }catch(err){
        throw new AppError("Not able to fliter the query ",StatusCodes.BAD_REQUEST) ;
    }
}
module.exports = {
    createFlight,
    getAllFlights
};
