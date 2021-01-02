const mongoose = require('mongoose');
const mongooseOptions = require('./configModel');
const videoSchema = new mongoose.Schema({
    idLesson: {
        ref: 'Lesson',
        type: mongoose.Schema.ObjectId,
        required: [true, 'A Lesson must have name Course']
    },
    titleVideo: {
        type: String,
        required: [true, 'Video must have a title']
    },
    pathUrl: {
        type: String,
        required: [true, 'Video must have a Url']
    },
    isLooked: {
        type: Boolean,
        required: ['Can video not for student watch'],
        default: false
    }
}, mongooseOptions)

const Video = mongoose.model('Video', videoSchema)

module.exports = Video;