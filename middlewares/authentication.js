const { User } = require('../models')
const { verify } = require('../helpers/helper.js')

module.exports = {
	isLogin(req, res, next) {
		const { token } = req.headers
		const { id, email, role } = verify(token)
		try {
			User.findOne({
				where: { id, email, role }
			})
				.then(data => {
					if (data) {
						req.decoded(data)
						next()
					} else {
						next({
							status: 401,
							message: 'Please login first'
						})
					}
				})
				.catch(next)
		} catch (error) {
			next(error)
		}
	},
	isAdmin(req,res,next){
		const { token } = req.headers
		const { role } = verify(token)
		role === 'admin' ? next() : next({
			status: 403,
			message: 'Only admin can do this action'
		})
	},
	isTeacher(req,res,next){
		const { token } = req.headers
		const { role } = verify(token)
		role === 'teacher' ? next() : next({
			status: 403,
			message: 'Only teacher can do this action'
		})
	}
}