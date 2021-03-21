const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  let salt = bcrypt.genSaltSync(+process.env.SALTY);
  let hash = bcrypt.hashSync(password, salt);
  return hash
}
  
const decodePassword = (password, passFromDB) => {
  const decode = bcrypt.compareSync(password, passFromDB)
  return decode
}

module.exports = {
  hashPassword,
  decodePassword
}