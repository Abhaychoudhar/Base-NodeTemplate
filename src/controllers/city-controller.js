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
module.exports = {createCity}