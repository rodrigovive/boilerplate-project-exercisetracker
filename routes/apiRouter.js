const express = require('express')
const apiRouter = express.Router()
const { addUser } = require('../controllers/userController');
const { addExercise } = require('../controllers/exerciseController')

function router() {

  apiRouter.route('/exercise/new-user',addUser)
      .post();

  apiRouter.route('/exercise/add',addExercise)
      .post();

  return apiRouter;

}