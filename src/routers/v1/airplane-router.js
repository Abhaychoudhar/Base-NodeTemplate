const express = require("express");
const router = express.Router();

const { AirplaneMiddlewares } = require("../../middlewares");
const { AirplaneController } = require("../../controllers");

router.post(
    "/",
    AirplaneMiddlewares.validateCreateRequest, 
    AirplaneController.createAirplane
);

router.get("/",AirplaneController.getAirplanes)
router.patch("/:id",AirplaneController.updateAirplane)
router.get("/:id",AirplaneController.getAirplane)
router.delete("/:id",AirplaneController.deleteAirplane)
module.exports = router;