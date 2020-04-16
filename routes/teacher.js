const {Router} = require('express')

Router.get('/class', res.send('ini kelas'))
Router.get('/class/:id', res.send('ini list student di kelas'))
Router.post('/class/:id/:studentId', res.send)
Router.get('/class/:id/:subjectId/:studentId', res.send('ini lihat nilai siswa'))
Router.post('/class/:id/:subjectId/:studentId', res.send('ini post nilai siswa'))

module.exports = Router