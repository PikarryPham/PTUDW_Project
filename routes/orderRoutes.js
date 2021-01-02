const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require("../controllers/authController");
const router = express.Router({
    mergeParams: true
})
router.use(authController.protect, authController.restrictTo('instructors', 'user'))

router.route("/").get(orderController.indexOrder)
    .post(orderController.postOrderCheckOut)
module.exports = router;