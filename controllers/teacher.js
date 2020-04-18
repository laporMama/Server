const { Teacher } = require('../models');

module.exports = {
	async getAll(req, res, next) {
		const teachers = await User.findAll({
			where: {
				role: 'teacher'
			}
		})

		res.status(200).json({
			teachers
		})
	},
	create(req, res, next) {

	},
	update(req, res, next) {

	},
	destroy(req, res, next) {

	}
	// async getById(req, res, next) {
	// 	const { id } = req.params;

	// 	const teacher = await User.findOne({
	// 		where: { id }
	// 	})

	// 	res.status(200).json({
	// 		teacher
	// 	})
	// },
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