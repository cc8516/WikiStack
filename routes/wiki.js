const express = require("express");
const router = express.Router();
const layouts = require("../views");
const { Page, User, db } = require("../models");

function generateSlug(title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, "_").replace(/\W/g, "");
}

router.get("/", (req, res, next) => {
  //   res.send("got to GET /wiki/");
  res.redirect("/wiki");
});

router.post("/", async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;

  try {
    const page = await Page.create({
      title: title,
      content: content,
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(layouts.addPage());
});

Page.beforeValidate((page) => {
  page.slug = generateSlug(page.title);
});

module.exports = router;
