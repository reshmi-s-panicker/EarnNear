const { registerUser, loginUser } = require('../services/auth.service');

const userRegister = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message || 'Server error' });
  }
};

const userLogin = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: 'user' },
    });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message || 'Server error' });
  }
};

module.exports = { userRegister, userLogin };