import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user_routes.js";
import tourRoutes from "./routes/tour_routes.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", userRoutes);
app.use("/tour", tourRoutes);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("TravelCOM API is running");
});

const CONNECTION_URL = "mongodb+srv://nazifa:nazifa1234@cluster0.tiz9i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`Server started on port ${port}`))
  )
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
