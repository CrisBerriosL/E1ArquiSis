const express = require('express');

const router = express.Router();

const landing = require('./api/landing');
const user = require('./api/user');

router.use('/', landing);
router.use('/user', user);

module.exports = router;