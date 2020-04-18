const Helper = require('../helpers/helper')
const { verify } = require('../helpers/helper')
const { User } = require('../models')

module.exports = (req, res, next) => {
  console.log('authen masuk');
  let { token } = req.headers;

	let payload = {};

	try {
		payload = verify(token);
	} catch (error) {
		next(error)
	}

	let { id, email } = payload;

	User.findOne({
		where: { id, email }
	})
		.then(result => {
			if (result) {
				req.decoded = payload;
				next();
			} else {
				next({
          status: 400,
          message: 'Please Log in'
				})
			}

			return null
		})
		.catch(next)
};
