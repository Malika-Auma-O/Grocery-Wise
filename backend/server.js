require("express-async-errors");
const express = require("express");
const app = express();
require("./connection")
require("dotenv").config();
const port = process.env.PORT || 8080;
hostName = "0.0.0.0";
const cors = require("cors");

// add middleware
app.use(express.json());

const userAuthRouter = require("./routes/userAuthRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const favoriteRouter = require("./routes/favouriteRouter");
const weeklyNeedRouter = require("./routes/weeklyNeedRouter");
const temporaryNeedRouter = require("./routes/temporaryNeedRouter");
const imageRouter = require("./routes/imageRouter");
const searchRouter= require("./routes/searchRouter");
const geocodeRouter= require("./routes/geocodeRouter");
const contactRouter= require("./routes/contactRouter");
const adminRouter= require("./routes/adminRouter");
const groceryProductsRouter = require("./routes/groceryProductsRouter");


const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000/";
app.use(
  cors({
    origin: FRONTEND_URL,
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
app.use("/api", geocodeRouter);
app.use("/api", contactRouter);
app.use("/api", adminRouter);
app.use("/api", groceryProductsRouter);

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});


app.listen(port, hostName, err => {
  if(err) {
    console.log(err)
  } else {
    console.log(`Server is running at http://${hostName}:${port}`)
  }
})

module.exports = app;