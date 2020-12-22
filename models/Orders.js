const mongoose = require('mongoose');
// Orders // rating // createdAt // ref to course // ref to user

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a User.']
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: [true, 'Review must belong to a course.']
    },
    createAt: {
        type: Date,
        default: new Date(),
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price must greater or equal than 1']
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;