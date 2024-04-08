const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { sendForgotPasswordEmail } = require("../utils/mailer");
const otpMap = new Map();
const AuthController = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findUserByEmailAndPassword(email, password);
      if (user) {
        // User found, send success response
        const id = user.id;
        const role = user.role; // Assuming user.role exists
        const token = jwt.sign({ id, role }, "jwtsecretKey", { expiresIn: 3000 });        
        res.status(200).json({ message: "Login successful", user, token });
      } else {
        // User not found or incorrect credentials, send error response
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      // Error handling
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const otp = Math.floor(100000 + Math.random() * 900000);

      otpMap.set(email, otp);

      await sendForgotPasswordEmail(email, otp);
      res.status(200).json({ message: "OTP sent to your email address" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ error: "Failed to send OTP. Please try again." });
    }
  },

  async verifyOTP(req, res) {
    const { email, enteredOTP, newPassword } = req.body;

    try {
      if (otpMap.has(email) && otpMap.get(email) == enteredOTP) {
        otpMap.delete(email);

        await UserModel.updatePasswordByEmail(email, newPassword);

        res
          .status(200)
          .json({
            message: "OTP verification successful and password updated",
          });
      } else {
        res.status(401).json({ error: "Invalid OTP" });
      }
    } catch (error) {
      console.error("Error verifying OTP and updating password:", error);
      res
        .status(500)
        .json({
          error: "Failed to verify OTP and update password. Please try again.",
        });
    }
  },
};

module.exports = AuthController;
