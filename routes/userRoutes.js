const express = require('express');
const userController = require('../controllers/userControllers');

const router = express();

router.get('/', userController.getAll);


module.exports = router;