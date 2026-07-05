const bcrypt = require('bcryptjs');
const User = require('../models/User');
const hashPassword = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken');

const registerUser = async ({ name, email, password, phone, location }) => {
  const existing = await User.findOne({ email });
  if (existing) throw { status: 400, message: 'Email already registered' };

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword, phone, location });
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw { status: 404, message: 'Invalid email or password' };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { status: 401, message: 'Invalid email or password' };

  const token = generateToken(user._id, 'user');
  return { token, user };
};

module.exports = { registerUser, loginUser };