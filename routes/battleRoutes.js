const express = require("express");
const battleController = require("../controllers/battleController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(battleController.createBattle)
  .get(battleController.getAllBattle);

router
  .route("/:id")
  .patch(battleController.updateBattle)
  .get(battleController.getBattle);

module.exports = router;
