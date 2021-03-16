const express = require('express')
const router = express.Router()
const userRoutes = require("./login-routes")
const productsRoutes = require("./products-routes")

router.use("/", userRoutes)
router.use("/", productsRoutes)


module.exports = router