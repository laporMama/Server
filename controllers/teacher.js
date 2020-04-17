const { Teacher } = require('../models');

class TeacherController {
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