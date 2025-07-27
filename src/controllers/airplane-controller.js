// airplane-controller.js
const { AirplaneService } = require("../services");
const  {StatusCodes} = require("http-status-codes") ;
const {SuccessResponse,ErrorResponse} = require('../utils/common')
async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error ;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function getAirplanes(req,res){
       try{
         console.log("hii") ;
            const airplanes = await AirplaneService.getAirplanes() ;
            SuccessResponse.message = airplanes
            return res.status(StatusCodes.OK).json(SuccessResponse) ;
       } catch(error){
             ErrorResponse.error = error ;
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).res(ErrorResponse) ;
       }
}
async function getAirplane(req,res){
       try{
             id = req.params.id ;
            const airplanes = await AirplaneService.getAirplane(id) ;
            SuccessResponse.message = airplanes
            return res.status(StatusCodes.OK).json(SuccessResponse) ;
       } catch(error){
             ErrorResponse.error = error ;
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse) ;
       }
}
async function deleteAirplane(req,res){
       try{
             id = req.params.id ;
            const airplanes = await AirplaneService.deleteAirplane(id) ;
            SuccessResponse.message = airplanes
            return res.status(StatusCodes.OK).json(SuccessResponse) ;
       } catch(error){
            ErrorResponse.error = error ;
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse) ;
       }
}
async function updateAirplane(req,res){
       try{
            id = req.params.id ;
            data = req.body ;
            const response = await AirplaneService.updateAirplane(id,data) ;
            return res.status(StatusCodes.OK).json(SuccessResponse) ;
       } catch(error){
            ErrorResponse.error = error ;
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse) ;
       }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
};
