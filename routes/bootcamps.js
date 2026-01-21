import express from 'express';
import {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    bootcampPhotoUpload
} from '../controllers/bootcamps.js';

import advancedResults from '../middleware/advancedResults.js';
import Bootcamp from '../models/Bootcamp.js';

// Include other resource routers
import courseRouter from './courses.js';

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
    .route('/:id/photo')
    .put(bootcampPhotoUpload);

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(createBootcamp);
    
router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

export default router;
