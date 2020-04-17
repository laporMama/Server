const { User, Teacher, Parent } = require('../models');
const helper = require('../helpers/helper');

class UserController {
  static async registerParent (req, res, next) {
    console.log(`controller masuk`);
    console.log(req.body);
    try {
      const { name, email, password, phoneNumber } = req.body

      const createdParent = await User.create({
        name,
        email,
        password,
        phoneNumber,
        role: 'parent'
      })

      if (createdParent) {
        res.status(201).json({
          message: 'Parent successfully created',
          createdParent
        })
      } else {
        throw {
          status: 500,
          message: 'Internal Server Error'
        }
      }
    } catch (error) {
      next(error)
    }
  }

  /*
      user / parent
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING

      student
      name: DataTypes.STRING,
      ClassId: DataTypes.INTEGER,
      ParentId: DataTypes.INTEGER

      teacher
      UserId: DataTypes.INTEGER,
      CourseId: DataTypes.INTEGER

      create teacher
      create parent
      create student
      create course
  */
  static async registerTeacher (req, res, next) {
    try {
      const { name, email, password, role, phoneNumber } = req.body

      const created = await User.create({
        name, email, password, role, phoneNumber
      })

      if (created) {
          const createdStudent = Student.create({

          })
      } else {
        throw {
          status: 500,
          message: 'Internal Server Error'
        }
      }
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