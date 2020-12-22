const express = require('express');
const exphbs = require("express-handlebars");

const app = express();

app.use(express.json());

app.engine("hbs", exphbs({
    extname: ".hbs"
}));

app.use(express.static(`${__dirname}/public/`));
app.set("view engine", "hbs");

app.get('/', (req, res) => {
    res.render("index", {

    });
})
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/register", (req, res) => {
    res.render("register");
});

module.exports = app;