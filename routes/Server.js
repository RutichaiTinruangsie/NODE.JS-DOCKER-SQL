const router = require("express").Router();

router.get("/", async (req, res) => {
  res.send({ status: true, data: { message: "Server is running" } });
});

module.exports = router;
