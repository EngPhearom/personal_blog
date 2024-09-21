const express = require('express');
const userController = require('../controllers/userControllers');

const router = express();

//getAll
router.get('/', userController.getAll);


module.exports = router;