import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import errorHandler from './middleware/error.js';
import connectDB from './config/db.js';
import colors from 'colors';

// Connect to database
connectDB();

// Route files
import bootcamps from './routes/bootcamps.js';
import courses from './routes/courses.js';
import auth from './routes/auth.js';

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(import.meta.dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`.red);

    server.close(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close(); // Ensure Mongoose 9 connection closes
        }
        process.exit(1);
    });
});

