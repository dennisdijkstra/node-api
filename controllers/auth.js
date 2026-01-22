import asyncHandler from '../middleware/async.js';
import User from '../models/User.js';

// @routes      GET /api/v1/auth/register
const register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        token,
    });
});

export { register };
