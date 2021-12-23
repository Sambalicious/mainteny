const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { asyncMiddleware } = require('../middleware/AsyncMiddleware');
const { Student, Course } = require('../models');
const { apiResponse } = require('../utils/apiResponse');
const Op = require('sequelize').Op;

const validateStudent = (body) => {
  const schema = Joi.object({
    Name: Joi.string().required().max(255),
    Password: Joi.string().required().min(6).max(50),
    Email: Joi.string().required().max(255).email(),
  });

  return schema.validate(body);
};
async function encryptPassword(password) {
  try {
    let SALT = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, SALT);
  } catch (error) {
    console.log(error.message);
  }
}

exports.createStudent = asyncMiddleware(async (req, res) => {
  let { Name, Password, Email } = req.body;
  let { error } = validateStudent(req.body);

  if (error) {
    return res
      .status(400)
      .json(apiResponse({ code: 400, errorMessage: error.details[0].message }));
  }

  let student = await Student.findOne({ where: { Email } });

  if (student) {
    return res.status(400).json(
      apiResponse({
        code: 400,
        errorMessage: 'You are already registered. Please Login',
      })
    );
  }

  Password = await encryptPassword(Password);

  student = await Student.create({
    Name,
    Email,
    Password,
  });

  return res
    .status(200)
    .json(apiResponse({ code: 200, data: { Student: student } }));
});

let defaultPageSize = 5;
const getPagination = (pageIndex, pageSize) => {
  const limit = pageSize ? +pageSize : defaultPageSize;
  let pageNumber = pageIndex > 1 ? pageIndex - 1 : 0;
  const offset = pageIndex ? pageNumber * limit : 0;

  return { limit, offset, pageNumber };
};

const getPaginatedData = ({ data, pageNumber, pageSize, dataKeyName }) => {
  const { count: TotalCount, rows } = data;

  const CurrentPage = pageNumber >= 1 ? pageNumber + 1 : 1;

  const TotalPages = Math.ceil(
    TotalCount / (pageSize ? pageSize : defaultPageSize)
  );

  return { [dataKeyName]: rows, TotalCount, TotalPages, CurrentPage };
};

exports.getStudentsWithPagination = asyncMiddleware(async (req, res) => {
  const { name, pageIndex, pageSize } = req.query;
  const condition = name ? { Name: { [Op.like]: `%${name}%` } } : null;
  const { limit, offset, pageNumber } = getPagination(pageIndex, pageSize);
  //retrieve data with condition
  let students = await Student.findAndCountAll({
    where: condition,
    limit,
    offset,
    include: 'Courses',
  });

  const response = getPaginatedData({
    data: students,
    pageNumber,
    pageSize,
    dataKeyName: 'Students',
  });

  return res.json(apiResponse({ code: 200, data: response }));
});

exports.addCourse = asyncMiddleware(async (req, res) => {
  let student = Student.findOne({ where: { Email } });

  if (!student) {
    return res.status(404).json(
      apiResponse({
        code: 404,
        errorMessage: 'This student is not registered',
      })
    );
  }

  let course = Course.findOne({ where: { Course } });
  if (!course) {
    return res
      .status(404)
      .json(
        apiResponse({ code: 404, errorMessage: 'This course does not exist' })
      );
  }
  student.addCourse(course);

  let response = await student.getCourse();

  return res.status(200).json(apiResponse({ code: 200, data: response }));
});
