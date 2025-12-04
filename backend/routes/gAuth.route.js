const express = require("express")

const { googleLogin }= require ("../controllers/authController.js");

const router = express.Router();

// POST /api/auth/google
router.post("/google", googleLogin);

module.exports=router;
