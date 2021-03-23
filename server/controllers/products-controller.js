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

    Product.create(body)
      .then((data) => {
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
      ],
      order: [
        ['id', 'ASC']
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

  static addOrReduceProduct(req, res, next) {
    const idProduct = +req.params.id
    const operator = req.params.operator
    let updateData = {}

    Product.findOne({ where: { id: idProduct }})
      .then((data) => {
        if (data && operator == "plus") {
          updateData = {
            stock: data.stock + 1 
          }
        } else if (data && operator == "minus") {
          updateData = {
            stock: data.stock - 1 
          }
        } else {
          next({code: 404, message: "Data not Found"})
        }
        return Product.update(updateData, { where: { id: idProduct }})
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        if (err) {
          next({code: 404, message: "Data not Found"})
        } else {
          next({code: 500, message: "Internal Server Error", from: "dari showcategories controller"})
        }
      }) 
  }

  static showProductById (req, res, next) {
    Product.findOne({ where: { id: +req.params.id }})
      .then((data) => {
        if (data) res.status(200).json(data)
        else throw new Error('not found')
      })
      .catch((err) => {
        console.log(err)
        if (err.message === 'not found') {
          next({ code: 404, message: "Data not Found" })
        } else {
          next({ code: 500, message: "Internal Server Error" })
        }
      })
  }
}

module.exports = ControllerProduct