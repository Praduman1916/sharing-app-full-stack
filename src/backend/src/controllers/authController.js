
const authService = require('../services/authService');

const registerUser = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};