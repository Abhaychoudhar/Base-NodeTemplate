const {CityService } = require("../services");
const  {StatusCodes} = require("http-status-codes") ;
const {SuccessResponse,ErrorResponse} = require('../utils/common')
async function createCity(req, res) {
    try {
       // console.log(req.body.name) ;
        const airplane = await CityService.createCity({
            name: req.body.name,          
        });
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error)
        ErrorResponse.error = error ;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function deleteCity(req,res){
  try{    
           
          id = req.params.id ;
          console.log(id) ;
          const response = await CityService.deleteCity(id) ;
          return res.status(StatusCodes.OK).json(SuccessResponse) ;
  } catch(error){
          ErrorResponse.error = error ;
         console.log(error) ;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse) ;
  }
}
async function getCity(req,res){
  try{    
           
          id = req.params.id ;
          console.log(id) ;
          const response = await CityService.getCity(id) ;
          return res.status(StatusCodes.OK).json(SuccessResponse) ;
  } catch(error){
          ErrorResponse.error = error ;
         console.log(error) ;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse) ;
  }
}
async function getCities(req,res){
       try{
         console.log("hii") ;
            const airplanes = await CityService.getCities() ;
            SuccessResponse.message = airplanes
            return res.status(StatusCodes.OK).json(SuccessResponse) ;
       } catch(error){
             ErrorResponse.error = error ;
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).res(ErrorResponse) ;
       }
}
async function updateCity(req,res){
       try{
            id = req.params.id ;
            data = req.body ;
            const response = await CityService.updateCity(id,data) ;
            return res.status(StatusCodes.OK).json(SuccessResponse) ;
       } catch(error){
            ErrorResponse.error = error ;
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse) ;
       }
}
module.exports = {
    createCity,
    deleteCity,
    getCities,
    updateCity,
    getCity
}