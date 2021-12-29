const { asyncMiddleware } = require('../middleware/AsyncMiddleware');
const { User } = require('../models');
const Joi = require('joi');
const { apiResponse } = require('../utils/apiResponse');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateUser = (body) => {
  const schema = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().min(3).required().max(255),
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

exports.createUser = asyncMiddleware(async (req, res) => {
  let { Password, Email } = req.body;
  let { error } = validateUser(req.body);

  if (error) {
    return res
      .status(400)
      .json(apiResponse({ code: 400, errorMessage: error.details[0].message }));
  }

  let user = await User.findOne({ where: { Email } });

  if (user) {
    return res.status(400).json(
      apiResponse({
        code: 400,
        errorMessage: 'You are already registered. Please Login',
      })
    );
  }

  Password = await encryptPassword(Password);

  user = await User.create({
    Email,
    Password,
  });

  return res.status(200).json(apiResponse({ code: 200, data: { User: user } }));
});
