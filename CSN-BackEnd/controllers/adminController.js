const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Function to validate email format
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Admin Registration
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: 'Invalid email format' });
    }

    // Check if admin already exists
    let existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: 'Admin already exists with this email' });
    }

    // Create new admin
    const newAdmin = new Admin({
      email,
      password
    });

    await newAdmin.save();

    const payload = {
      admin: { id: newAdmin.id }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ 
        msg: 'Admin registered successfully', 
        token,
        admin: {
          id: newAdmin.id,
          email: newAdmin.email
        }
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: 'Invalid email format' });
    }

    // Find admin by email
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate a JWT token for the admin
    const payload = {
      admin: { id: admin.id }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ 
        token,
        admin: {
          id: admin.id,
          email: admin.email
        }
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


