const express = require('express')
const router = express.Router()
const ControllerProduct = require("../controllers/products-controller")
const { authenticate, authorization } =require("../middlewares/auth")

//authentication after login
// router.use(authenticate)
// see all product in database
router.get("/products", authenticate , authorization, ControllerProduct.showProduct)

// add new product to database
router.use("/addproduct", authenticate , authorization, ControllerProduct.addProduct)

// edit product from database
router.put("/product/:id", authenticate , authorization, ControllerProduct.updateProduct)

// delete product from database
router.delete("/product/:id", authenticate , authorization, ControllerProduct.deleteProduct)

module.exports = router