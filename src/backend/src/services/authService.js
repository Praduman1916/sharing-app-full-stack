const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

const registerUser = async ({ name, email, mobile, role, password }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return {
      status: 400,
      data: { message: 'Email already registered' },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, mobile, role, password: hashedPassword });

  return {
    status: 201,
    data: { message: 'User registered successfully', userId: user.id },
  };
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        status: 400,
        data: { message: 'Invalid credentials' },
      };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        status: 400,
        data: { message: 'Invalid credentials' },
      };
    }
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      status: 200,
      data: { message: 'Login successful', token },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      status: 500,
      data: { message: 'Internal server error' },
    };
  }
};

module.exports = {
  registerUser,
  loginUser,
};
