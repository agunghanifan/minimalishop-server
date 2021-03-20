const { User, Product, Category } = require("../models")
const product = require("../models/product")

class ControllerProduct {

  static addProduct(req, res, next) {
    const body = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId || 1,
    }
    console.log("masuk controller add product")
    console.log(body)

    Product.create(body)
      .then((data) => {
        console.log(data)
        res.status(201).json(data)
      })
      .catch((err) => {
        console.log(err)
        let errors = []
        if (err.errors.length) {
          err.errors.forEach((error) => {
            errors.push(error.message)
          })
          next({code: 400, message: errors, from: "dari addproduct controller"})
        } else if (err.message) {
          next({code: 400, message: err.message, from: "dari addproduct controller"})
        } else {
          next({code: 500, message: "Internal Server Error", from: "dari addproduct controller"})
        }
      })
  }

  static showProduct(req, res, next) {
    Product.findAll({
      include: [
        {
          model: Category
        }
      ]
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        next({code: 500, message: "Internal Server Error", from: "dari showproduct controller"})
      })
  }

  static getUpdate(req, res, next) {
    const idProduct = req.params.id
    Product.findOne({where: {id: idProduct}})
      .then((data) => {
        if(data) {
          res.status(200).json(data)
        } else {
          next({code: 404, message: "Product not found", from: "getUpdate controller"})
        }
      })
      .catch((err) => {
        console.log(err)
        next({code: 500, message: "Internal Server Error", from: "getUpdate controller"})
      })
  }

  static updateProduct(req, res, next) {
    const idProduct = +req.params.id
    const body = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId
    }
    Product.update(body, {where: {id: idProduct}})
      .then((data) => {
        if(data[0] == 1) {
          res.status(200).json({message: `Update Success id ${idProduct}`, data: body})
        } else {
          next({code: 400, message:"Data Product harus diisi", from: "dari updateproduct controller"})
        }
      })
      .catch((err) => {
        console.log(err)
        let errors = []
        if (err.errors.length) {
          err.errors.forEach((error) => {
            errors.push(error.message)
          })
          next({code: 400, message: errors, from: "dari updateproduct controller"})
        } else if (err.message) {
          next({code: 400, message: err.message, from: "dari updateproduct controller"})
        } else {
          next({code: 500, message: "Internal Server Error", from: "dari updateproduct controller"})
        }
      })
  }

  static showEditData(req, res, next) {
    const idProduct = +req.params.id
    console.log(idProduct, "<<<<<<<<<<<<<<<< id show edit")
    Product.findOne({ where : {id: idProduct}})
      .then((data) => {
        if (data) {
          res.status(200).json(data)
        } else {
          next({code: 404, message: "Data not found", from: "showeditData controller"})
        }
      })
      .catch((err) => {
        console.log(err)
        next({code: 500, message: "Internal Server Error", from: "showeditData controller"})
      })
  }

  static deleteProduct(req, res, next) {
    const idProduct = +req.params.id
    console.log(idProduct)
    Product.destroy({where: {id: idProduct}})
      .then((data) => {
        if(data) {
          res.status(200).json({message: `Success delete id ${idProduct}`})
        } else {
          next({code: 404, message:"Product not found", from: "dari deleteproduct controller"})
        }
      })
      .catch((err) => {
        console.log(err)
        next({code: 500, message: "Internal Server Error", from: "dari deleteproduct controller"})
      })
  }

  static showCategories(req, res, next) {
    Category.findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        next({code: 500, message: "Internal Server Error", from: "dari showcategories controller"})
      })
  }

  static addCategory(req, res, next) {
    const body = {
      name: req.body.name
    } 
    Category.create(body)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        if (err) {
          next({code: 400, message: err.errors[0].message, from: "addcategory controller"})
        }
        console.log(err)
        next({code: 500, message: "Internal Server Error", from: "dari showcategories controller"})
      })
  }
}

module.exports = ControllerProduct