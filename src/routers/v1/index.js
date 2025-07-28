const express = require('express');
const router = express.Router();
const airplaneroutes = require("./airplane-router") ;
const cityroutes = require("./city-router") ;
router.use("/airplanes",airplaneroutes) ;
router.use("/cities",cityroutes) ;

module.exports = router;
