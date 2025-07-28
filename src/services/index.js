const { createAirplane } = require("./airplane-services");

module.exports={
    // rename 
    AirplaneService : require("./airplane-services") ,
    CityService : require("./city-services")
}