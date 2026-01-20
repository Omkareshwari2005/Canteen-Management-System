const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/canteenDB";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/auth"));


app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});