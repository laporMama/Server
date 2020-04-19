module.exports = (err, req, res, next) => {
  let status = 500
  let message = 'Internal Server Error'

  console.log(err, '<<<<<===!!!ERROR!!!===>>>>>')

  if (err.status) {
    status = err.status
    message = err.message
  } else if (err.name === 'SequelizeValidationError') {
    let error = []
    err.errors.forEach(el => error.push(el.message))
    status = 400
    message = error[0]
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    message = 'Email already in use'
  } else if (err.name === 'JsonWebTokenError') {
    status = 401
    message = 'please login first!'
  }

  res.status(status).json({
    message
  })
}