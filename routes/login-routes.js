const express = require('express')
const router = express.Router()
const UserController = require("../controllers/login-admin")
const UserCostumerController = require('../controllers/login-customer')

// login admin routes
router.post("/login", UserController.loginAdmin)

// login customer routes
router.post('/loginCustomer', UserCostumerController.loginCustomer)

// register customer routes
router.post("/register", UserCostumerController.register)

module.exports = router