exports.getUserProfile = (req, res, next) => {

    res.render('user-profile', {
        layout: false
    })

}