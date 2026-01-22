import fs from 'fs';
import mongoose from 'mongoose';
import Bootcamp from './models/Bootcamp.js';
import Course from './models/Course.js';

mongoose.connect(process.env.MONGO_URI, {});

const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (e) {
        console.error(e);
    }
};

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (e) {
        console.error(e);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}