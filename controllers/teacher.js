const { Teacher, Course } = require('../models');

module.exports = {
	async getAll(req, res, next) {
		const teachers = await Teacher.findAll()
		res.status(200).json({
			data: teachers
		})
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
				res.status(200).json({
					message: 'Success update data teacher'
				})
			})
			.catch(next)
	},
	destroy(req, res, next) {
		const { id } = req.params
		Teacher.destroy({
			where: {id}
		})
			.then(() => {
				res.status(200).json({
					message: 'Success delete teacher data'
				})
			})
			.catch(next)
	},
	async getById(req, res, next) {
		const { id } = req.params;

		const teacher = await Teacher.findOne({
			where: { id },
			include: [{ model: Course }]
		})

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