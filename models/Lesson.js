const mongoose = require('mongoose');
const schemaOptions = require('./configModel')
const lessonSchema = new mongoose.Schema({
    idCourse: {
        ref: 'Course',
        type: mongoose.Schema.ObjectId,
        required: [true, 'A Lesson must have name Course']
    },
    titleLesson: {
        type: String,
        required: [true, 'Video must have a title']
    },
}, schemaOptions)
lessonSchema.virtual('videos', {
    ref: 'Video',
    foreignField: 'idLesson',
    localField: '_id'
})

const Lesson = mongoose.model('Lesson', lessonSchema)

module.exports = Lesson;