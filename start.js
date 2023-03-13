const app = require("./app");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection
  .on("connected", () => {
    console.log(`Database Connection on ${process.env.DATABASE}`);
  })
  .on("error", (err) => {
    console.log(`Connection Error : ${err.message}`);
  });

const server = app.listen(3000, () => {
  console.log(`App is running on port ${server.address().port}`);
});
