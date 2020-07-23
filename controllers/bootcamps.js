const path = require('path');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');

// @desc        Get all bootcamps
// @routes      GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc        Get single bootcamp
// @routes      GET /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    
    if(!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: bootcamp,
    });
});

// @desc        Create new bootcamp
// @routes      POST /api/v1/bootcamps
// @access      Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        data: bootcamp
     });
});

// @desc        Update bootcamp
// @routes      PUT /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if(!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: bootcamp,
    });
});

// @desc        Delete bootcamp
// @routes      DELETE /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    bootcamp.remove();

    res.status(200).json({
        success: true,
        data: {},
    });
});

// @desc        Upload photo for bootcamp
// @routes      PUT /api/v1/bootcamps/:id/photo
// @access      Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    if(!req.files) {
        return next(
            new ErrorResponse(`Please upload a file`, 404)
        );
    }

    const file = req.files.file;

    // Make sure the image is a photo
    if(!file.mimetype.startsWith('image')) {
        return next(
            new ErrorResponse(`Please upload an image file`, 400)
        );
    }

    // Check file size
    if(file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
            new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400)
        );
    }

    // Create custom file name
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err) {
            console.error(err);

            return next(
                new ErrorResponse(`Problem with file upload`, 500)
            );
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name })

        res.status(200).json({
            success: true,
            data: file.name,
        });
    });
});
