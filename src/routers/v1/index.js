const express = require('express');
const router = express.Router();
const airplaneroutes = require("./airplane-router") ;
const cityroutes = require("./city-router") ;
const airportroutes = require("./airport-router") ;
router.use("/airplanes",airplaneroutes) ;
router.use("/cities",cityroutes) ;
router.use("/airports",airportroutes) ;

module.exports = router;
