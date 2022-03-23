const { JWT_SECRET } = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const { findBy } = require("../users/users-model");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({
      status: 401,
      message: "Token required",
    });
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      next({
        status: 401,
        message: "Token invalid",
      });
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const [user] = await findBy({ username: req.body.username });
    if (!user) {
      next({
        status: 422,
        message: "Invalid credentials",
      });
    } else {
      req.users = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

async function checkUsernameFree(req, res, next) {
  try {
    const users = await findBy({ username: req.body.username });
    if (!users.length) {
      next();
    } else {
      next({ status: 422, message: "Username taken" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  restricted,
  checkUsernameExists,
  checkUsernameFree,
};
