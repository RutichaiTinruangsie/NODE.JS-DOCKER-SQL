const bcrypt = require("bcryptjs");
const { paramRequired } = require("../module");
const router = require("express").Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post("/token", async (req, res) => {
  const { username, password1, password2 } = req.body;
  if (username === undefined) return res.send(paramRequired("username"));
  if (password1 === undefined) return res.send(paramRequired("password1"));
  if (password2 === undefined || "")
    return res.send(paramRequired("password2"));
  const hashedPassword = await bcrypt.hash(password2, 10);
  const validatePassword = await bcrypt.compare(password1, hashedPassword);
  const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
    expiresIn: "3m",
  });
  res.send({
    status: "success",
    data: {
      password: hashedPassword,
      validatePassword: validatePassword,
      token: token,
    },
  });
});
module.exports = router;
