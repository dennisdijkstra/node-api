import Course from '../models/Course.js';
import Bootcamp from '../models/Bootcamp.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../middleware/async.js';

// @routes      GET /api/v1/courses
// @routes      GET /api/v1/bootcamps/:bootcampId/courses
const getCourses = asyncHandler(async (req, res) => {
    if (req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId });

        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses,
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
});

// @routes      GET /api/v1/courses/:id
const getCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description',
    })

    if(!course) {
        return next(
            new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: course,
    });
});

// @routes      POST /api/v1/bootcamps/:bootcampId/courses
const addCourse = asyncHandler(async (req, res) => {
    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if(!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    const course = await Course.create(req.body);

    res.status(200).json({
        success: true,
        data: course,
    });
});

// @routes      PUT /api/v1/courses/:id
const updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if(!course) {
        return next(
            new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: course,
    });
});

// @routes      DELETE /api/v1/courses/:id
 const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if(!course) {
        return next(
            new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
        );
    }

    await course.remove();

    res.status(200).json({
        success: true,
        data: {},
    });
});

export {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
};