const express = require("express");
const morgan = require("morgan");
const layouts = require("./views");
const { Page, User, db } = require("./models");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use("/wiki", wikiRouter);

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.send(layouts.main(""));
});

const PORT = 3000;

const init = async () => {
  await db.sync({ force: true });
  // await Page.sync();
  // await User.sync();

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
