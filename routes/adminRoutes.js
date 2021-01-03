const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
router.use(authController.protect, authController.restrictTo('admin'))

router.route('/').get(adminController.getIndexAdminProfile)
router.route('/user').get(adminController.getIndexAdminProfile)
router.route('/instructor').get(adminController.getIndexAdminProfile)
module.exports = router;