import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import errorHandler from './middleware/error.js';
import connectDB from './config/db.js';
import bootcamps from './routes/bootcamps.js';
import courses from './routes/courses.js';
import auth from './routes/auth.js';
import 'colors'

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(fileupload());
app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold));

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`.red);

    server.close(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
        process.exit(1);
    });
});

