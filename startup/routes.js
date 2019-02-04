const penyandangs = require("../routes/penyandangs");
const error = require("../middlewares/error");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send("TEST");
  });
  app.use("/api/penyandangs", penyandangs);
  app.use(error);
};
