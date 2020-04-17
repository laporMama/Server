const { Teacher } = require('../models');

class TeacherController {
	static async getAll (req, res, next) {
		const teachers = await User.findAll({
			where: {
				role: 'teacher'
			}
		})

		res.status(200).json({
			teachers
		})
	}

	static async getById (req, res, next) {
		const { id } = req.params;

		const teacher = await User.findOne({
			where: { id }
		})

		res.status(200).json({
			teacher
		})
	}

	static getAllClass (req, res, next) {
		res.send('list kelas');
	}

	static getAllStudentByClassId (req, res, next) {
		res.send('list student berdasarkan kelas');
	}

	static setAttendance (req, res, next) {
		res.send('absensi siswa');
	}
	
	static getStudentScore (req, res, next) {
		res.send('ini lihat nilai siswa');
	}

	static setStudentScore (req, res, next) {
		res.send('ini post nilai siswa');
	}
}

module.exports = TeacherController;