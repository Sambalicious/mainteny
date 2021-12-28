const { createCourse, getCourses } = require('../controller/course');
const auth = require('../middleware/auth');
const router = require('express').Router();

router.post('/', [auth], createCourse);
router.get('/', [auth], getCourses);

module.exports = router;
