const express = require("express");
const app = express();
const path = require("path");
const path2 = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

app.use(express.json());

/**
 * Connecting...
 * Nen dat dong mongoose.connect vao 1 cho khac de dam bao an toan thong tin
 */
mongoose.connect("mongodb://localhost:27017/PTUDW", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connected");
});

/**
 * Phan trang
 */
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.static(`${__dirname}/public/`));

app.get("/", (req, res) => {
  res.render(`${__dirname}/public/index`, {
    title: "string",
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
/**
 * Connect to server
 */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
