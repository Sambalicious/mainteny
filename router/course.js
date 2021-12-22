const { createCourse } = require('../controller/course');

const router = require('express').Router();

router.post('/', createCourse);

module.exports = router;
