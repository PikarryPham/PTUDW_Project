const catchAsync = require("../utils/catchAsync")
const User = require("../models/User")

exports.getUserProfile = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).lean()
    res.render('user-profile', {
        layout: false,
        user,
    })
})
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (!allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if users POTSs password data

    if (req.body.password || req.body.passwordConfirm) {
        res.render('user-profile', {
            layout: false,
            notification: 'Do not Update password or password '
        })
        // bug
        return;
    }

    // 2) Filtered out unwanted fields names that are not allowed to be update
    const filteredBody = filterObj(req.body, 'name', 'email');
    // 3) Update user document address

    const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    }).lean();
    console.log(updateUser)
    res.redirect('/profile')
});