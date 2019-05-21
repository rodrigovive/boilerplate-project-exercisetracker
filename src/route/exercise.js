const express = require('express')
const router = new express.Router()
const exerciseController = require('../controller/exercise');

router.post('/exercise/add', exerciseController.create);
router.get('/exercise/log',exerciseController.getExerciseFromUser)
module.exports = router;