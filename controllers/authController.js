const catchAsync = require("../utils/catchAsync");
//const AppError = require('../utils/appError');
const User = require('../models/User');
const Course = require("../models/Course");
const APIFeatures = require("../utils/apiFeatures");

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
    const {
        email,
        password
    } = req.body;

    // 1) CHECK IF EMAIL AND PASSWORD exits
    if (!email || !password) {

        res.render('login', {
            error: 'Please provide email and password !'
        });
        return;
        //return next(new AppError('Please provide email and password !', 400));
    }
    // 2) CHECK IF USER  EXITS && PASSWORD IS CORRECT
    const user = await User.findOne({
        email
    }).select('+password');
    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
        res.render('login', {
            error: 'Incorrect email or password'
        });
        return;
    }
    createdSendCookie(user, res);
})
exports.postRegister = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    createdSendCookie(newUser, res)
})
exports.getLogin = async (req, res, next) => {

    if (req.signedCookies.jwt) {
        res.redirect('/')
        return;
    }
    res.render("login", {
        layout: false
    });
}
exports.getRegister = async (req, res, next) => {

    res.render("register", {
        layout: false
    })
}
exports.index = async (req, res) => {
    const user = await User.findById(req.signedCookies.jwt).lean();
    req.query.limit = 4;
    const features = new APIFeatures(Course.find(), req.query).paginate();
    const courses = await features.query.lean()
    res.render("index", {
        user,
        courses,
    });
}

exports.getLogout = async (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/login", {
        layout: false
    });
}
exports.restrictTo = (...roles) => {
    return async (req, res, next) => {
        const user = await User.findById(req.signedCookies.jwt);
        // roles ['admin', 'instructors']. role = 'user'
        //console.log(req.user);
        if (!roles.includes(user.role)) {
            return next(
                new AppError('You  do not have permission to perform this action', req.originalUrl)
            );
        }
        next();
    };
};