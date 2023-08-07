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
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const favoriteRouter = require("./routes/favouriteRouter");
const weeklyNeedRouter = require("./routes/weeklyNeedRouter");
const temporaryNeedRouter = require("./routes/temporaryNeedRouter")
const imageRouter = require("./routes/imageRouter")
const searchRouter= require('./routes/searchRouter')

app.use(
  cors({
    origin: "*",
  })
)

app.use("/api/auth", userAuthRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", favoriteRouter);
app.use("/api", weeklyNeedRouter);
app.use("/api", temporaryNeedRouter);
app.use("/api", imageRouter);
app.use("/api", searchRouter);


app.listen(port, hostName, err => {
  if(err) {
    console.log(err)
  } else {
    console.log(`Server is running at http://${hostName}:${port}`)
  }
})
