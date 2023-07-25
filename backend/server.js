const express = require("express");
const app = express();
require("./connection")
require("dotenv").config();
const port = process.env.PORT || 8080;
hostName = "localhost";
const cors = require("cors");

// add middleware
app.use(express.json());

const userAuthRouter = require("./routes/userAuthRouter");

app.use(
  cors({
    origin: "*",
  })
)

app.use("/api/auth", userAuthRouter);


app.listen(port, hostName, err => {
  if(err) {
    console.log(err)
  } else {
    console.log(`Server is running at http://${hostName}:${port}`)
  }
})
