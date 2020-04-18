const { User, Teacher, Parent, Student } = require('../models');
const helper = require('../helpers/helper');

class UserController {
  static async registerParent (req, res, next) {
    try {
      const { name, email, password, phoneNumber } = req.body

      const createdParent = await User.create({
        name,
        email,
        password,
        phoneNumber,
        role: 'parent'
      })

      res.status(201).json({
        message: 'Parent successfully created',
        createdParent
      })
    } catch (error) {
      next(error)
    }
  }

  static async registerStudent (req, res, next) {
    console.log(`controller masuk`);
    try {
      const { name, ClassId, ParentId } = req.body;

      const student = await Student.create({
        name, ClassId, ParentId
      })

      res.status(201).json({
        message: 'Student successfully created',
        createdStudent: student
      })
    } catch (error) {
      next(error)
    }
  }

  static async registerTeacher (req, res, next) {
    try {
      const { name, email, password, role, phoneNumber, CourseId } = req.body

      const createdUser = await User.create({
        name,
        email,
        password,
        phoneNumber,
        role: 'teacher'
      })

      const createdTeacher = await Teacher.create({
        UserId: createdUser.id,
        CourseId
      })

      res.status(201).json({
        message: 'Teacher successfully created',
        createdTeacher,
        createdUser
      })
    } catch (error) {
      next(error)
    }
  }

  static async login (req, res, next) {
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