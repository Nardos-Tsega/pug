const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

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
      res.send("Thank you for registering");
    } else {
      res.render("form", {
        title: "Registration Form",
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

module.exports = router;
