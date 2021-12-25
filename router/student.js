const {
  createStudent,
  getStudentsWithPagination,
  getStudentData,
  addCourse,
} = require('../controller/student');

const router = require('express').Router();

router.post('/', createStudent);
router.get('/', getStudentsWithPagination);
router.get('/:UserId', getStudentData);
router.post('/:UserId', addCourse);

module.exports = router;
