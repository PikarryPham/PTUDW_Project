const {
    User,
    Course,
    Orders
} = require('../models/index');

exports.indexOrder = async (req, res, next) => {
    const idUser = req.signedCookies.jwt;
    const {
        courseId
    } = req.params
    const user = await User.findById(idUser).lean();
    const course = await Course.findById(courseId).lean();
    if (!course) {
        res.redirect('/')
        return;
    }
    res.render('checkout', {
        user,
        course
    })
}
exports.postOrderCheckOut = async (req, res, next) => {
    const {
        courseId
    } = req.params
    const user = await User.findById(req.user.id).lean();
    const course = await Course.findById(courseId);

    if (!user || !course) {
        res.redirect('/login')
        return;
    }
    course.enrolled = course.enrolled + 1
    await course.save()
    req.body.user = req.user.id;
    req.body.course = courseId
    req.body.price = course.price;
    await Orders.create(req.body)
    res.redirect('/')
}