module.exports = (err, req, res, next) => {
  // console.log(err.name)
  if (err.name === 'SequelizeValidationError') {
    err.status = 400;
    err.message = err.errors.map(el => el.message);
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    err.status = 400;
    err.message = 'Email Already Exists';
  }

  if (err.name === 'JsonWebTokenError') {
    err.status = 401;
    err.message = 'You Must Login / Register First';
  }

  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
}