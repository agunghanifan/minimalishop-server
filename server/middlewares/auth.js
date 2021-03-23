const { User, Product, Category, Cart } = require("../models")
const { getToken, decodeToken } = require("../helpers/jwt")

const authenticate = (req, res, next) => {
  try {
    const decode = decodeToken(req.headers.access_token)
    if (decode) {
      User.findOne({where: {email: decode.email, id: decode.id, name: decode.name, role: decode.role}})
        .then((data) => {
          if (data) {
            console.log("Pass authentication")
            req.user = {id: data.id, email: data.email, role: data.role, name: data.name} 
            next()
          } else {
            console.log("fail authentication <<<<<")
            next({code: 401, message:"Unauthorize User"})
          }
        })
    }
  } catch (error) {
    if(error) {
      next({code: 401, message:"Unauthorize User"})
    } else {
      next({code: 500, message:"Internal Server Error"})
    }
  }
}

const authorization = (req, res, next) => {
  const role = req.user.role
  const admin = "admin"

  if (role !== admin) {
    next({code: 401, message:"Unauthorize User"})
  } else if (role === "admin") {
    console.log("success authorization admin")
    next()
  } else {
    next({code: 500, message:"Internal Server Error"})
  }
}

const authorizationCustumer = (req, res, next) => {
  const idCart = req.params.id
  const idUser = req.user.id

  Cart.findOne({ where: { id: idCart, userId: idUser }})
    .then((data) => {
      if (!data) {
        throw new Error()
      } else {
        console.log('Pass AUthorization Customer')
        next()
      }
    })
    .catch((err) => {
      if (err) {
        next({code: 401, message:"Unauthorize User"})
      } else {
        next({code: 500, message:"Internal Server Error"})
      }
    })
}

module.exports = {
  authenticate,
  authorization,
  authorizationCustumer
}