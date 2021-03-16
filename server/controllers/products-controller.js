const { User, Product, Category } = require("../models")

class ControllerProduct {

  static addProduct(req, res, next) {
    const body = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
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
}

module.exports = ControllerProduct