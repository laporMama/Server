const { User, Teacher } = require('../models');
const helper = require('../helpers/helper');

class UserController {
  static register(req, res, next) {
    const { name, email, password, role, phoneNumber, CourseId } = req.body

    User.create({
      name, email, password, role, phoneNumber
    })
      .then(data => {
        if (role !== 'teacher') {
          res.status(201).json({
            message: `Success create ${role}`
          })
        } else {
          return Teacher.create({
            UserId: data.id,
            CourseId
          })
        }
      })
      .then(() => {
        res.status(201).json({
          message: `Success create ${role}`
        })
      })
      .catch(next)
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email: email }
      })

      if (user) {
        const dbPass = user.password;

        if (helper.comparePassword(password, dbPass)) {
          const payload = {
            id: user.id,
            role: user.role,
            email
          };

          const token = helper.generateToken(payload);

          res.status(200).json({
            token,
            data: {
              id: user.id,
              name: user.name
            },
            message: `Success login as ${user.role}`
          });
        } else {
          throw {
            status: 400,
            message: 'Invalid email / password'
          }
        }
      } else {
        throw {
          status: 400,
          message: 'Invalid email / password'
        }
      }
    } catch (error) {
      next(error)
    }

  }
}

module.exports = UserController;