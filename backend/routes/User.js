const express = require('express');
const { Login, ChangePassword, ResetPassword, getOtp, VerifyOtp, ChangePin, ResetPin } = require('../controller/User');

const router = express.Router();

router.post('/login', Login)

router.put('/changePassword', ChangePassword)

router.put('/resetPassword', ResetPassword)

router.put('/changePin', ChangePin)

router.get('/verificationCode/:code', getOtp)

router.post('/code/verify', VerifyOtp)

router.put('/resetPin', ResetPin)


module.exports = router;