const express = require('express')
const router = express.Router()
const userRoutes = require("./login-routes")
const productsRoutes = require("./products-routes")
const bannerRoutes = require("./banner-routes")
const customerRoutes = require("./customer-routes")

router.use("/", userRoutes)
router.use("/", productsRoutes)
router.use("/", bannerRoutes)
router.use("/", customerRoutes)


module.exports = router