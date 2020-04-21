const { Teacher, Course } = require('../models');
const { getRedis, setRedis, deleteRedis } = require('../helpers')

module.exports = {
	getAll(req, res, next) {
		const dataRedis = getRedis('teacher')/* istanbul ignore next line */
		if (dataRedis) {
			res.status(200).json({
				data: dataRedis
			})
		}/* istanbul ignore next */else {
			Teacher.findAll()
				.then(data => {
					setRedis('teacher', data)
					res.status(200).json({
						data
					})
				})
				.catch(next)
		}
	},
	update(req, res, next) {
		const { UserId, CourseId } = req.body
		const { id } = req.params
		Teacher.update({
			UserId, CourseId
		}, {
			where: { id }
		})
			.then(() => {
				const _ = deleteRedis('teacher')
				res.status(200).json({
					message: 'Success update data teacher'
				})
			})
			.catch(next)
	},
	destroy(req, res, next) {
		const { id } = req.params
		Teacher.destroy({
			where: { id }
		})
			.then(() => {
				const_ = deleteRedis('teacher')
				res.status(200).json({
					message: 'Success delete teacher data'
				})
			})
			.catch(next)
	},/* istanbul ignore next */
	async getById(req, res, next) {
		const { id } = req.params;
		const teacher = await Teacher.findOne({
			where: { id },
			include: [{ model: Course }]
		})
		res.status(200).json({
			teacher
		})
	}
}