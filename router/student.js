const {
  createStudent,
  getStudentsWithPagination,
} = require('../controller/student');

const router = require('express').Router();

router.post('/', createStudent);
router.get('/', getStudentsWithPagination);

module.exports = router;
