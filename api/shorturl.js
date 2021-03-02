const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/", (request, response) => {
  response.send(request.text);
});

module.exports = router;
