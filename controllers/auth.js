import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../middleware/async.js';
import User from '../models/User.js';

// @desc        Register user
// @routes      GET /api/v1/auth/register
// @access      Public
const register = asyncHandler(async (req, res) => {
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

export { register };
