const {
  createStudent,
  getStudentsWithPagination,
  getStudentData,
  addCourse,
} = require('../controller/student');
const auth = require('../middleware/auth');
const router = require('express').Router();

router.post('/', createStudent);
router.get('/', [auth], getStudentsWithPagination);
router.get('/:UserId', [auth], getStudentData);
router.post('/:UserId', [auth], addCourse);

module.exports = router;
