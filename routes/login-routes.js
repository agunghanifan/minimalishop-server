const express = require('express')
const router = express.Router()
const UserController = require("../controllers/login-admin")

router.use("/login", UserController.loginAdmin)

module.exports = router