const express = require('express')
const router = express.Router()
const { authenticate, authorizationCustumer } = require("../middlewares/auth")
const CustomerController = require("../controllers/costumer-controller")

// show all item in carts
router.get("/carts", authenticate, CustomerController.showCarts)

// add item to carts
router.post('/addtocarts/:idProduct', authenticate, CustomerController.addToCarts)

// remove item on carts
router.delete('/carts/:id', authenticate, authorizationCustumer, CustomerController.removeToCart)

// checkout product dari cart
router.patch('/carts/:id/checkout', authenticate, authorizationCustumer, CustomerController.checkoutProduct)

// update amount item on customer cart 
router.patch('/carts/:id/:operator', authenticate, authorizationCustumer, CustomerController.updateCart)

module.exports = router