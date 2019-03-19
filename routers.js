const express = require("express");

const db = require("./data/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db.findById(id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  try {
    const edit = await db.insert(post);
    const newPost = await db.findById(edit.id);
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.send(500).json({ message: "error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db.findById(id);
    const deleted = await db.remove(id);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.send(500).json({ message: "error" });
  }
});

router.put("/:id", async (req, res) => {});

module.exports = router;
