const catchAsync = require("../utils/catchAsync")
const User = require("../models/User")
const Course = require("../models/Course")

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

exports.getAddWishList = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.idCourse);
    if (!course) {
        res.redirect('/course');
        return;
    }
    await User.findByIdAndUpdate(req.user.id, {
        $push: {
            wishCourse: course._id
        }
    }, {
        runValidators: true
    });
    res.redirect('/course');
})

exports.getAllWishListByUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('wishCourse', 'title _id ').lean();
    res.render('wish-list', {
        layout: false,
        user,
    })
})
exports.deleteOneWishList = catchAsync(async (req, res, next) => {
    const {
        idCourse
    } = req.params;
    await User.findByIdAndUpdate(req.user.id, {
        $pull: {
            wishCourse: idCourse
        }
    }, {
        new: true,
    })
    res.redirect('/profile')
})