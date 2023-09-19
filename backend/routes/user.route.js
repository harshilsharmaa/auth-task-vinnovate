const express = require('express');
const router = express.Router();

const { register, login, deleteProfile } = require('../controllers/user.controller');


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/delete/profile').delete(deleteProfile);

module.exports = router;