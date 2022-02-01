const mongoose = require('mongoose')


const quizSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    }, //
    quizDateAdded: {
        type: Date, 
        required: true,
        default: Date.now
    },
    results: [{
            category: {type: String},
            type: {type: String},
            difficulty: {type: String},
            question: {type: String},
            correct_answer: {type: String},
            incorrect_answers: [],
            audio: {type: String},
            sono: {type: String},
            image: {type: String}
        }],
    image: {type: String},
    quizName: {type:String}
})

module.exports = mongoose.model('test', quizSchema)


