function errorHandler(err, req, res, next) {
  if (!err.status) {
    res.status = 500;
    return res.send(err);
  }
  res.status(err.status);
  console.log(err.message);
  res.send(err.message);
}

module.exports = errorHandler;
