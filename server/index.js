const express = require("express");
const cors = require("cors");

const authRouts = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 8000;

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
