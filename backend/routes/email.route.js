const express = require('express');

const emailRouter = express.Router();
const {  emailLogin,  sendOtp, verifyOtpAndSavePass,verifyMe } =  require('../controllers/emailController.js');

emailRouter.post('/send-otp',sendOtp);
emailRouter.post('/login',emailLogin);
emailRouter.post('/verify-otp-and-save',verifyOtpAndSavePass);
emailRouter.get('/verify-token', verifyMe)

module.exports = emailRouter;