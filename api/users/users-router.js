const express = require("express");
const {
  //   checkUsernameExists,
  checkUsernameFree,
} = require("../auth/middleware");
const { JWT_SECRET } = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./users-model");
const router = express.Router();

router.post("/signup", checkUsernameFree, (req, res, next) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);
  User.addUser({ username, password: hash })
    .then((newUser) => {
      res.status(201).json({
        user: newUser.user,
        username: User.username,
      });
    })
    .catch(next);
});

router.post(
  "/login",
  // checkUsernameExists,
  (req, res, next) => {
    const { username, password } = req.body;
    const existingUser = User.findByName(username);
    if (!existingUser) {
      res.json({
        status: 401,
        message: "Invalid credentials",
      });
    }
    res.status(200).json(existingUser);
    // const doesPasswordMatch = bcrypt.compareSync(
    //   req.body.password,
    //   existingUser.password
    // );
    // if (!doesPasswordMatch) {
    //   res.json({
    //     status: 401,
    //     message: "Invalid credentials",
    //   });
    // } else {
    //   const token = buildToken(req.users);
    //   res.json({
    //     message: `Welcome, ${existingUser.username}`,
    //     token,
    //   });
    // }

    // if (bcrypt.compareSync(req.body.password, password)) {
    //   const token = buildToken(req.users);
    //   res.json({
    //     message: `Welcome, ${req.users.username}`,
    //     token,
    //   });
    // } else {
    //   next({
    //     status: 401,
    //     message: "Invalid credentials",
    //   });
    // }
  }
);

router.put("/:user_id", (req, res, next) => {
  const changes = req.body;
  User.updateUser(req.params.user_id, changes)
    .then(user => {
      if(user){
        res.status(200).json(user)
      }else{
        res.status(404).json({ message: "The user could not be found." })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Error updating the user." });
    });
});

router.delete("/:user_id", (req, res, next) => {
  User.deleteUser(req.params.user_id)
    .then(users => {
      if(users > 0){
        res.status(200).json({ message: "The user has been deleted." })
      }else{
        res.status(404).json({ message: "The user could not be found." })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Error deleting the user." });
    });
});

function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    password: user.password,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;
