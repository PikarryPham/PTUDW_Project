const express = require('express');
const {
    orderController
} = require('../controllers/index');

const router = express.Router({
    mergeParams: true
})

router.get('/', orderController.indexOrder)
module.exports = router;