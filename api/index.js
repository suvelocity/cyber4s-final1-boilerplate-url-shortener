const { Router } = require("express");
const { router } = require("./shorturl");
const statistics = require("./statistics");

const api = Router();

api.use("/shorturl", router);
api.use("/statistics", statistics);
api.use("*", (req, res) => {
  res.status(404).send({ message: "Page Not Found" });
});

module.exports = api;
