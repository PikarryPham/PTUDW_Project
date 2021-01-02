const mongoose = require('mongoose');
const schemaOptions = require('./configModel');
// Orders // rating // createdAt // ref to course // ref to user

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order must belong to a User.']
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: [true, 'Order must belong to a course.']
    },
    createAt: {
        type: Date,
        default: new Date(),
    },
    fullName: {
        type: String,
        required: [true, 'Order must belong to a course.']
    },
    fullName: {
        type: String,
        required: [true, 'Order must belong to a course.']
    },
    ccyear: {
        type: Number,
        required: [true, 'Order must CCYEAR to a course']
    },
    cvv: {
        type: Number,
        required: [true, 'Order must CCV to a course']
    },
    ccmonth: {
        type: Number,
        required: [true, 'Order must have CC Month a course']
    },
    numberCard: {
        type: Number,
        required: [true, 'Order must number Credit Number card']
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price must greater or equal than 1']
    }
}, schemaOptions)

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;