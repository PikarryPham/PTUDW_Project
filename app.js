const express = require('express');
const exphbs = require("express-handlebars");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express();
const userRouter = require('./routes/userRoutes')
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIES_SECRET));
app.engine("hbs", exphbs({
    defaultLayout: "main",
    extname: ".hbs"
}));
app.set("view engine", "hbs");

app.use(express.static(`${__dirname}/public/`));
app.use('/', userRouter)


module.exports = app;