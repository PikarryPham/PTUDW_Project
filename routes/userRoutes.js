const express = require('express');

const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController')
const router = express.Router();
router.get('/', authController.index)
router.get('/logout', authController.getLogout)
router
    .route('/register')
    .get(authController.getRegister)
    .post(authController.postRegister);
router
    .route('/login')
    .get(authController.getLogin)
    .post(authController.postLogin);
router.route('/profile')
    .get(userController.getUserProfile)
module.exports = router;