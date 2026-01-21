import ErrorResponse from '../utils/ErrorResponse.js';

const errorHandler = (err, _, res) => {
    let error = { ...err };
    error.message = err.message;
    
    // Log to console for dev
    console.log(err.stack.red);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Bootcamp not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(err => err.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
    });
};

export default errorHandler;
