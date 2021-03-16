const { User } = require("../models")
const { getToken } = require("../helpers/jwt")
const { decodePassword } = require("../helpers/hash-password")

class UserController {

  static loginAdmin(req, res, next) {
    const body = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({ where: {email: body.email}})
      .then((data) => {
        const decode = decodePassword(body.password, data.password)
        if(decode) {
          const access_token = getToken(data)
          res.status(200).json({id: data.id, access_token, name: data.name, role: data.role, email: data.email})
        } else {
          next({code: 404, message: "Email / Password is wrong, try again.", from: "login controller"})
        }
      })
      .catch((err) => {
        console.log(err)
        console.log(body.email, "<<<<<<<<<<")
        console.log(body.password, ">>>>>>>>>>>>>>")
        if(!body.email || !body.password) {
          next({code: 400, message: "Email / Password wajib diisi", from: "login controller"})
        } else if (body.email || body.password) {
          next({code: 404, message: "Email / Password is wrong, try again.", from: "login controller"})
        } else {
          next({code: 500, message: "Internal Server Error", from: "login controller"})
        }
      })
  }
}

module.exports = UserController