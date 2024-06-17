const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.send({
      status: "failed",
      error: "Access denide, on token provider",
    });
  }

  const data = token.split(":");
  if (data.length !== 2)
    return res.send({ status: "failed", error: "Invalid token format." });

  const user = data[0];
  const accessToken = data[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.send({ status: "failed", error: "Invalid token." });
  }
};

module.exports = {
  auth,
};
