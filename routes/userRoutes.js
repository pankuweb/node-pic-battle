const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// router.post("/sendForgotPasswordOTP", authController.sendForgotOTP);
// router.post("/verfifyForgotPasswordOTP", authController.verifyForgotOTP);
// router.patch("/resetPassword/:id", authController.resetPassword);
// router.patch("/updatePassword/:id", authController.updatePassword);

router.post("/googlelogin", authController.googlelogin);
router.post("/googlesignup", authController.googlesignup);

// router.post("/sendOTP", authController.validateUserSignUp);
// router.post("/verifyOTP", authController.otpvalidation);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
