const express = require('express');
const router = express.Router();
const lessonRoutes = require('./lessonRoutes');
const videoRoutes = require('./videoRoutes');
const authController = require('../controllers/authController');
const multer = require('multer');
const upload = multer({
    dest: './public/uploads/'
})

const instructorController = require('../controllers/instructorController');
router.use(authController.protect, authController.restrictTo('instructors'))
router.route("/course/:idCourse").get(instructorController.getIndexEditCourse).post(upload.single('imageCover'),instructorController.postEditCourse);
router.use("/course/:idCourse/lesson", lessonRoutes)
router.use("/course/:idCourse/video", videoRoutes)
router.route("/course/:idCourse/delete")
    .get(instructorController.getDeleteCourse)
router.route("/course/:idCourse/complete").get(instructorController.getCompleteCourse)

// Muốn add video thì phải có lesson cho video ?

module.exports = router;