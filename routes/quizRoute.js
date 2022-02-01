const express = require('express')
const router = express.Router()
const Quiz = require('../models/quiz')
const cors = require('cors');

// Get
router.get('/', async (req, res) => {
    try {
        const quiz = await Quiz.find()
        res.setHeader('Content-Type', 'application/json');
        res.json(quiz)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})


// Get Quiz by ID
router.get('/:id', getQuizID, (req, res) => {
    res.send(res.quiz)
})


// Create
router.post('/', cors(), async (req, res) => {
    // Creates a Quiz
    const quiz = new Quiz()
    if (req.body._id != null) {
        quiz._id = req.body._id
    }
    if (req.body.results != null) {
        quiz.results = req.body.results
    }
    if (req.body.image != null) {
        quiz.image = req.body.image
    }
    if (req.body.quizName != null) {
        quiz.quizName = req.body.quizName
    }
    try {
        const newQuiz = await quiz.save()
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(newQuiz)

    }catch (err){
        res.status(400).json({message: err.message})
    }
})

// Update
router.patch('/:id', getQuizID, async (req, res) => {
    if (req.body._id != null) {
        res.quiz._id = req.body._id
    }
    if (req.body.results != null) {
        res.quiz.results = req.body.results
    }
    if (req.body.image != null) {
        res.quiz.image = req.body.image
    }
    if (req.body.quizName != null) {
        res.quiz.quizName = req.body.quizName
    }
    try {
        const updated = await res.quiz.save()

        res.json(updated)
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Delete
router.delete('/:id', getQuizID, async (req, res) => {
    try {
        await res.quiz.remove()
        res.json({message: 'Quiz Deleted'})
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.options('*', cors())

async function getQuizID(req, res, next) {
    let quiz
    try {
        quiz = await Quiz.findById(req.params.id)
        if (quiz == null) {
            return res.status(404).json({message: 'Cannot find Quiz',
        body : req.body})
        }
    }catch (err){
        return res.status(500).json({message: err.message})
    }
    res.quiz = quiz
    next()
}


module.exports = router