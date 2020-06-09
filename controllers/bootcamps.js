// $desc        Get all bootcamps
// @routes      GET /api/v1/bootcamps
// @access      Public

exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all bootcamps' });
};

// $desc        Get single bootcamp
// @routes      GET /api/v1/bootcamps/:id
// @access      Public

exports.getBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
};

// $desc        Create new bootcamp
// @routes      POST /api/v1/bootcamps
// @access      Private

exports.createBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: 'Create new bootcamp' });
};

// $desc        Update bootcamp
// @routes      PUT /api/v1/bootcamps/:id
// @access      Private

exports.updateBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

// $desc        Delete bootcamp
// @routes      DELETE /api/v1/bootcamps/:id
// @access      Private

exports.deleteBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
