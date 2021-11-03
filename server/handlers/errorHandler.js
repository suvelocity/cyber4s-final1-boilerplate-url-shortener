function errorHandler(err, req, res, next) {
  if (!err.status) {
    res.status = 500;
  }
}

module.exports = errorHandler;
