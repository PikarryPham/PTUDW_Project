const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');

const {
    User,
    Course
} = require('../models/index');
const APIFeatures = require("../utils/apiFeatures");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    res.redirect("/login");
}
exports.restrictTo = (...roles) => {
    return async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You  do not have permission to perform this action', req.originalUrl)
            );
        }
        console.log('restrict To is running !')
        next();
    };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // 2) Check if posted current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        res.render('user-profile    ', {
            err: `Password current or password don't' match.`
        })
        return;
    }
    // 3) If so, update password

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // USER.findByIdAndUpdate will NOT work as intended !!

    // 4) Log user in, send JWT
    createdSendCookie(user, res);
})

exports.protect = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.signedCookies.jwt);

    if (!user) {
        res.render('login', {
            err: 'You must login make access permission'
        })
        return;
    }
    req.user = user;
    console.log('protect running')
    next();
})

exports.getForgotPassword = catchAsync(async (req, res, next) => {
    res.render('forgot-password', {
        layout: false
    })
})

exports.postForgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        res.render('forgot-password', {
            err: "There is no user with that email address"
        })
        return;
    }
    // 2) Generate random reset token
    const resetToken = user.createPasswordResetToken();

    // 3) Send it to user's email

    const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/user/resetPassword/${resetToken}`;
    const message = `Forgot  your password ? Submit a PATCH request with your new password an passwordConfirm to ${resetURL} `;
    const msg = {
        to: req.body.email,
        from: process.NODE_ENV.EMAIL_SEND_GIRD_DOMAIN, // Use the email address or domain you verified above
        subject: 'Your password reset token (valid for 10 min)',
        text: message,
        html: `<strong>${message}</strong>`,
    };

    try {
        await sgMail.send(msg).then(() => {
            res.render('forgot-password', {
                layout: false,
                notification: 'Send Verify at Your Email Check it now'
            });
        });
        return;

    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({
            validateBeforeSave: false
        });
        // bug
        res.send(err)

    }
})

exports.getResetPassword = catchAsync(async (req, res, next) => {

    res.render('reset-password', {
        layout: false,
        token: req.params.token
    })
})
exports.postRestPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {
            $gt: Date.now()
        }
    });
    if (!user) {
        res.redirect('/forgotPassword')
        // bug
        return;

    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    createdSendCookie(user, res)

})