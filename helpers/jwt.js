const jwt = require('jsonwebtoken');

  const getToken = (data) => {
    if (process.env.NODE_ENV === 'test') {
      const token = jwt.sign({id: data.id, name: data.name, email: data.email, role: data.role}, process.env.JWT_SECRET_TEST)
      return token
    } else if (process.env.NODE_ENV === 'development') {
      const token = jwt.sign({id: data.id, name: data.name, email: data.email, role: data.role}, process.env.JWT_SECRET_DEV)
      return token
    } else {
      const token = jwt.sign({id: data.id, name: data.name, email: data.email, role: data.role}, process.env.JWT_SECRET_PROD)
      return token
    }
  }
  const decodeToken = (token) => {
    if (process.env.NODE_ENV === 'test') {
      const verify = jwt.verify(token, process.env.JWT_SECRET_TEST)
      return verify
    } else if (process.env.NODE_ENV === 'development') {
      const verify = jwt.verify(token, process.env.JWT_SECRET_DEV)
      return verify
    } else {
      const verify = jwt.verify(token, process.env.JWT_SECRET_PROD)
      return verify
    }
  }


module.exports = {
  getToken,
  decodeToken
}
