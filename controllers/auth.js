const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc        Register user
// @routes      GET /api/v1/auth/register
// @access      Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Create User
    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    // Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        token,
    });
});
