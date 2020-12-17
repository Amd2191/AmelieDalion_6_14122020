const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const signupEntriesValidation = require('../middleware/signupEntriesValidation');

router.post('/signup', signupEntriesValidation ,userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;