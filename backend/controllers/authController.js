const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // 1. Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;
    const googleId = payload.sub;  // unique Google ID
    const picture = payload.picture;

    // 2. Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // 3. Create new user
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture, // store picture too
      });
    } else {
      // If existing user has no googleId, update it
      if (!user.googleId) {
        user.googleId = googleId;
      }

      // Update avatar every login (optional)
      user.avatar = picture;

      await user.save();
    }

    // 4. Generate JWT token for frontend
    const jwtToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: picture,
      },
    });

  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};

module.exports = { googleLogin };
