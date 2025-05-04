const express = require('express');
const authRouter = require('./auth');
const linkRouter = require('./userLink');
const verifyToken = require('../middleware/verifyToken');


const router = express.Router();

router.use('/auth', authRouter);
router.use('/link',verifyToken,linkRouter);


module.exports = router;