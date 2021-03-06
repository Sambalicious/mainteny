const auth = require('../router/auth');
const user = require('../router/user');
const student = require('../router/student');
const course = require('../router/course');

const logger = require('morgan');

const express = require('express');
const cors = require('cors');
const { handle404Error } = require('./error');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use('/api/login', auth);
  app.use('/api/register', user);
  app.use('/api/students', student);
  app.use('/api/courses', course);
  app.use(handle404Error);

  app.use(logger('dev'));
};
