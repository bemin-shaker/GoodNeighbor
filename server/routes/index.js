const constructorMethod = (app) => {
  app.use("/api", require("./stripe"));

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
