const app = require('../app.js')
const http = require('http')
const server = http.createServer(app)
const PORT = +process.env.PORT

server.listen(PORT, _ => console.log(`server is running on port ${PORT}`))