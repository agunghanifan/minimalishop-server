const express = require('express')
const router = express.Router()
const userRoutes = require("./login-routes")
const productsRoutes = require("./products-routes")
const bannerRoutes = require("./banner-routes")

router.use("/", userRoutes)
router.use("/", productsRoutes)
router.use("/", bannerRoutes)


module.exports = router