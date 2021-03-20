const express = require('express')
const router = express.Router()
const ControllerProduct = require("../controllers/products-controller")
const { authenticate, authorization } =require("../middlewares/auth")

//authentication after login
// see all product in database
router.get("/products", authenticate , authorization, ControllerProduct.showProduct)

// see all categories in database to put edit product and add new product page
router.get("/categories", authenticate , authorization, ControllerProduct.showCategories)

// add new product to database
router.post("/addproduct", authenticate , authorization, ControllerProduct.addProduct)

// add new category to database
router.post("/addcategory", authenticate , authorization, ControllerProduct.addCategory)

// show data to form edit in edit page
router.get("/product/:id", authenticate , authorization, ControllerProduct.showEditData)

// edit product from database
router.put("/product/:id", authenticate , authorization, ControllerProduct.updateProduct)

// delete product from database
router.delete("/product/:id", authenticate , authorization, ControllerProduct.deleteProduct)

module.exports = router