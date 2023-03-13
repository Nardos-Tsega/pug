const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const Registration = require("../model/Registration.js");
const path = require("path");
const auth = require("http-auth");

const basic = auth.basic(() => {
  file: path.join(__dirname, "../users.htpasswd");
});

router.get("/", (req, res) => {
  res.render("form", { title: "Registration Form" });
});

router.post(
  "/",
  [
    body("name").isLength({ min: 1 }).withMessage("Please Enter Name"),
    body("email").isLength({ min: 1 }).withMessage("Please Enter Email"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration
        .save()
        .then(() => {
          res.send("Thank you for registering");
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.render("form", {
        title: "Registration Form",
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

router.get("/registration", (req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render("index", { title: "Listing Registrations", registrations });
    })
    .catch(() => {
      res.send("Sorry! something went wrong");
    });
});

module.exports = router;
