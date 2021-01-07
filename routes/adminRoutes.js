const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
router.use(authController.protect, authController.restrictTo('admin'))

router.route('/').get(adminController.getIndexAdminProfile)
router.route('/course/:idCourse/delete').get(adminController.deleteIndexCourse)
router.route('/user').get(adminController.getIndexUser)
router.route('/user/:idUser/delete').get(adminController.deleteIndexUser)
router.route('/instructor').get(adminController.getIndexInstructor)
router.route('/instructor/:idUser/delete').get(adminController.deleteIndexUser)
module.exports = router;