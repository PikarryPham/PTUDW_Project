const catchAsync = require("../utils/catchAsync");

const User = require('../models/User');

const createdSendCookie = (user, res) => {

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        signed: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', user._id, cookieOptions);
    user.password = undefined;
    res.redirect('/')

};
exports.postLogin = catchAsync(async (req, res, next) => {
    console.log("hello")
    console.log(req.body)
})
exports.postRegister = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    createdSendCookie(newUser, res)

})
exports.getLogin = async (req, res, next) => {
    console.log('Login called')
    res.render("login");
}
exports.getRegister = async (req, res, next) => {
    console.log('Login called')
    res.render("register")
}
exports.index = (req, res) => {
    console.log(req.signedCookies)
    res.render("index");
}