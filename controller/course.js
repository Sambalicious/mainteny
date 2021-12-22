const { asyncMiddleware } = require('../middleware/AsyncMiddleware');
const Joi = require('joi');
const { apiResponse } = require('../utils/apiResponse');
const { Course } = require('../models');
const validateCourse = (body) => {
  const schema = Joi.object({
    Course: Joi.string().required().max(255),
    Lecturer: Joi.string().required().min(1).max(255),
  });

  return schema.validate(body);
};

exports.createCourse = asyncMiddleware(async (req, res) => {
  let { Course: courseTitle, Lecturer } = req.body;
  let { error } = validateCourse(req.body);

  if (error) {
    return res
      .status(400)
      .json(apiResponse({ code: 400, errorMessage: error.details[0].message }));
  }

  let course = await Course.findOne({ where: { Course: courseTitle } });

  if (course) {
    return res.status(400).json(
      apiResponse({
        code: 400,
        errorMessage: 'Course already exist',
      })
    );
  }

  course = await Course.create({
    Course: courseTitle,
    Lecturer,
  });

  return res
    .status(200)
    .json(apiResponse({ code: 200, data: { Course: course } }));
});
