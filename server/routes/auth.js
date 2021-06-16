const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const Account = require("../models/account");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/signup-user",
  [
    body("email", "Please enter a valid email to continue.")
      .isEmail()
      .custom((value, { req }) => {
        return Account.findOne({ email: value }).then((accountDoc) => {
          if (accountDoc) {
            return Promise.reject(
              "Email address already exists, please try again with another email."
            );
          }
        });
      })
      
  ],
  authController.signupUser
);

router.get("/verify/:token", authController.verifyAccount);

router.post("/login", authController.login);

router.post(
  "/signup-seller",
  [
    body("email", "Please enter a valid email to continue.")
      .isEmail()
      .custom((value, { req }) => {
        return Account.findOne({ email: value }).then((accountDoc) => {
          if (accountDoc) {
            return Promise.reject(
              "Email address already exists, please try again with another  email."
            );
          }
        });
      })
      ],
  authController.signupSeller
);

router.post("/images-test", authController.imagesTest);

module.exports = router;
