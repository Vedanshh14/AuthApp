// controllers/pages.js

// Controller for student page
exports.studentPage = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome to the Student Dashboard, ${req.user.email}`,
  });
};

// Controller for admin page
exports.adminPage = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome to the Admin Dashboard, ${req.user.email}`,
  });
};
