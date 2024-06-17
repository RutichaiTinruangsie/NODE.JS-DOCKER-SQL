const router = require("express").Router();
const db = require("../db");
const { paramRequired } = require("../module");

router.get("/get", async (req, res) => {
  const strSql = `SELECT TOP 100 postId, title, content, postedAt, postedBy FROM posts ORDER BY postId`;
  const result = await db.executeSQL(strSql);
  res.send({ status: "success", data: result });
});

router.get("/:id", async (req, res) => {
  const strSql = `SELECT postId, title, content, postedAt, postedBy FROM posts WHERE postId=${req.params.id} ORDER BY postId`;
  const result = await db.executeSQL(strSql);
  res.send({ status: "success", data: result });
});

router.post("/edit", async (req, res) => {
  const { username, password } = req.body;

  if (username === undefined) return res.send(paramRequired("username"));
  if (password === undefined) return res.send(paramRequired("password"));

  res.send({
    status: "success",
    data: {
      username: username,
      password: password,
    },
  });
});

router.post("/", async (req, res) => {});

module.exports = router;
