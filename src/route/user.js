const express = require('express');
const router = new express.Router();
const userController = require('../controller/user')

router.post('/exercise/new-user',userController.create);
router.get('/exercise/users', userController.getAll)

module.exports = router; 