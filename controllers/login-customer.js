const { User } = require("../models")
const { getToken } = require("../helpers/jwt")
const { decodePassword } = require("../helpers/hash-password")

class UserCostumerController {

  static loginCustomer(req, res, next) {
    const body = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({ where: { email: body.email } })
      .then((data) => {
        const decode = decodePassword(body.password, data.password)
        if (decode && data.role === "customer") {
          const access_token = getToken(data)
          res.status(200).json({ id: data.id, access_token, name: data.name, role: data.role, email: data.email })
        } else {
          throw new Error()
        }
      })
      .catch((err) => {
        if (!body.email || !body.password) {
          next({ code: 400, message: "Email / Password wajib diisi", from: "login controller 2" })
        } else if (body.email || body.password) {
          next({ code: 404, message: "Email / Password is wrong, try again.", from: "login controller 3" })
        } else {
          next({ code: 500, message: "Internal Server Error", from: "login controller 4" })
        }
      })
  }

  static register(req, res, next) {
    const body = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }

    User.create(body)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        let errors = []
        if (err) {
          err.errors.forEach((error) => {
            errors.push(error.message)
          })
          next({ code: 400, message: errors, from: "register login customer controller"})
        } else {
          next({ code: 500, message: "Internal Server Error", from: "register controller" })
        }
      })
  }
}

module.exports = UserCostumerController