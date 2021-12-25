const { createCourse, getCourses } = require('../controller/course');

const router = require('express').Router();

router.post('/', createCourse);
router.get('/', getCourses);

module.exports = router;
