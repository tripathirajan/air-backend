const router = require("express").Router();

router.get("/list");
router.get("/info");
router.post("/add");
router.put("/update");

module.exports = router;
