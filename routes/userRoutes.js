const express = require('express');

const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController')
const router = express.Router();
router.get('/', authController.index)
router.get('/logout', authController.getLogout);


router
    .post('/user/updatePassword', authController.protect, authController.updatePassword);

router.route('/forgotPassword')
    .get(authController.getForgotPassword)
    .post(authController.postForgotPassword)

router.route('/resetPassword/:token')
    .get(authController.getResetPassword)
router.route('/updateMe').post(authController.protect, userController.updateMe)
router
    .route('/register')
    .get(authController.getRegister)
    .post(authController.postRegister);

router
    .route('/login')
    .get(authController.getLogin)
    .post(authController.postLogin);
router.route('/profile')
    .get(authController.protect, userController.getUserProfile)
module.exports = router;