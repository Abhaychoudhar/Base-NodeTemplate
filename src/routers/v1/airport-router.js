const express = require("express");
const router = express.Router();

const { AirportMiddlewares } = require("../../middlewares");
const { AirportController } = require("../../controllers");

router.post(
    "/",
    AirportMiddlewares.validateCreateRequest, 
    AirportController.createAirport
);

router.get("/",AirportController.getAirports)
// in patch you just send the object and only send those var in obj which you want to update and they
// will update automatically
router.patch("/:id",AirportController.updateAirport)
router.get("/:id",AirportController.getAirport)
router.delete("/:id",AirportController.deleteAirport)
module.exports = router;