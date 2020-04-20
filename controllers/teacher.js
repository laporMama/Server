const { Teacher, Course } = require('../models');
const { getRedis, setRedis, deleteRedis } = require('../helpers')

module.exports = {
	async getAll(req, res, next) {
		const dataRedis = getRedis('teacher')
		if (dataRedis) {
			res.status(200).json({
				data: dataRedis
			})
		} else {
			const teachers = await Teacher.findAll()
			setRedis('teacher', teachers)
			res.status(200).json({
				data: teachers
			})
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
				deleteRedis('teacher')
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
				deleteRedis('teacher')
				res.status(200).json({
					message: 'Success delete teacher data'
				})
			})
			.catch(next)
	},
	async getById(req, res, next) {/* istanbul ignore next */
		const { id } = req.params;
		/* istanbul ignore next */
		const teacher = await Teacher.findOne({
			where: { id },
			include: [{ model: Course }]
		})
		/* istanbul ignore next line */
		res.status(200).json({
			teacher
		})
	},
	// setAttendance(req, res, next) {
	// 	res.send('absensi siswa');
	// },
	// getStudentScore(req, res, next) {
	// 	res.send('ini lihat nilai siswa');
	// },
	// setStudentScore(req, res, next) {
	// 	res.send('ini post nilai siswa');
	// },
}