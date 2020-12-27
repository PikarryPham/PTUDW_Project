module.exports = {
    dividePercent(numb1, numb2) {

        return (parseInt(numb1) / parseInt(numb2)) * 100;
    },
    ifCondAdminInstructor(role) {
        return ['admin', 'instructors'].includes(role)
    },
    ifCondAdmin(role) {
        return ['admin'].includes(role)
    },
    isAddWishList(user, idCourse) {
        return user && user.wishCourse.find(el => el.toString() === idCourse.toString())
    }
}