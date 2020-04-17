const { User } = require('../models');

class UserController {
  static register (req, res, next) {
    res.send('register');
  }

  static login (req, res, next) {
    res.send('login');
  }
}

module.exports = UserController;