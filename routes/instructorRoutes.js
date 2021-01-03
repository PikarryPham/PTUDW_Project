const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const multer = require('multer');
const upload = multer({
    dest: './public/uploads/'
})

const instructorController = require('../controllers/instructorController');
router.use(authController.protect, authController.restrictTo('instructors'))
router.route("/course/:idCourse").get(instructorController.getIndexEditCourse);
router.route("/course/:idCourse/lesson")
    .get(instructorController.getIndexLesson)
    .post(instructorController.postAddLesson)
router.route("/course/:idCourse/video")
    .get(instructorController.getIndexAddVideo)
    .post(upload.single('pathUrl'), instructorController.postAddVideo)
router.route("/course/:idCourse/delete")
    .get(instructorController.getDeleteCourse)


// Muốn add video thì phải có lesson cho video ?

module.exports = router;