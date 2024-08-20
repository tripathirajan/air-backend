const router = require("express").Router();
const airlineController = require("../controllers/airlineController");

router.get("/list", airlineController.getAllAirline);
router.get("/info", airlineController.getAirlineInfo);
router.post("/add", airlineController.addNewAirline);
router.put("/update", airlineController.updateAirline);

module.exports = router;
