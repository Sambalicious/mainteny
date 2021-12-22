const Joi = require('joi');
const { asyncMiddleware } = require('../middleware/AsyncMiddleware');
const { Student } = require('../models');
const { apiResponse } = require('../utils/apiResponse');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateLogin = (body) => {
  const schema = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().min(6).required().max(255),
  });

  return schema.validate(body);
};

async function decryptPassword(requestBodyPassword, storedPassword) {
  try {
    return await bcrypt.compare(requestBodyPassword, storedPassword);
  } catch (error) {
    console.log(error.message);
  }
}

exports.login = asyncMiddleware(async (req, res) => {
  let { Email, Password } = req.body;

  let { error } = validateLogin(req.body);

  if (error) {
    return res
      .status(400)
      .json(apiResponse({ code: 400, errorMessage: error.details[0].message }));
  }

  let student = await Student.findOne({
    where: { Email },
  });

  if (!student) {
    return res
      .status(400)
      .json(
        apiResponse({ code: 400, errorMessage: 'You are not yet registered' })
      );
  }

  let validatedPassword = await decryptPassword(Password, student.Password);

  if (!validatedPassword) {
    return res
      .status(400)
      .json(apiResponse({ code: 400, errorMessage: 'Invalid credentials' }));
  }

  const token = jwt.sign({ student }, process.env.SECRET_TOKEN);

  return res.status(200).json(
    apiResponse({
      code: 200,
      data: { Student: student, AccessToken: token },
    })
  );
});
