const express = require('express');
const exphbs = require("express-handlebars");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express();

const courseRouter = require('./routes/courseRoutes');
const userRouter = require('./routes/userRoutes');
const globalError = require('./controllers/errorController')
app.use(bodyParser.urlencoded({
    defaultLayout: 'main',
    extended: false
}))
//const fs = require('fs');
// const Course = require('./models/Course');
// const a = JSON.parse(fs.readFileSync('./data.json', {
//     encoding: 'utf-8'
// }))
// a.data.map(async el => {
//     await Course.create(el).then(() => console.log('success'))
// })


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
app.use('/course', courseRouter)
app.use(globalError)

module.exports = app;