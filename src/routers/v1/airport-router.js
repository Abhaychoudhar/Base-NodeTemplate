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
router.patch("/:id",AirportController.updateAirport)
router.get("/:id",AirportController.getAirport)
router.delete("/:id",AirportController.deleteAirport)
module.exports = router;