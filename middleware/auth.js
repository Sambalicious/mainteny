const jwt = require('jsonwebtoken');
const { apiResponse } = require('../utils/apiResponse');

module.exports = function (req, res, next) {
  const token = req.header('x-access-token');
  console.log({ token });
  if (!token) {
    return res.status(401).json(
      apiResponse({
        code: 401,
        errorMessage: 'Access Denied. No Token found.',
      })
    );
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decodedToken.user;
    console.log('i need you', decodedToken.user);
    return next();
  } catch (error) {
    res
      .status(400)
      .json(apiResponse({ code: 400, errorMessage: 'Invalid token.' }));
  }
};
