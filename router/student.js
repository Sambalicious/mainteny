const {
  createStudent,
  getStudentsWithPagination,
  getStudentData,
  addCourse,
} = require('../controller/student');
const auth = require('../middleware/auth');
const router = require('express').Router();

router.post('/', createStudent);
router.get('/', getStudentsWithPagination);
router.get('/:UserId', [auth], getStudentData);
router.post('/:UserId', addCourse);

module.exports = router;
