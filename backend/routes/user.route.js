const express = require('express');
const router = express.Router();

const { register, login, deleteProfile, profile } = require('../controllers/user.controller');
const { isAuthenticated } = require('../middleware/auth');


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(isAuthenticated, profile);
router.route('/delete/profile').delete(deleteProfile);

module.exports = router;