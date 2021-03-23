const { User, Product, Category, Cart } = require("../models")

class CustomerController {
  static addToCarts(req, res, next) {
    const productId = +req.params.idProduct
    const userId = +req.user.id
    const body = {
      productId,
      userId
    }
    console.log(body)
    Product.findOne({ where: {id: productId}})
      .then((data) => {
        if (data.stock > 0) {
          return Cart.findOrCreate({ where: { productId, userId }, body})
        } else throw new Error('stock zero')
      })
      .then((data) => {
        if (data[1] === false) throw new Error('already exists')
        else res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        if (err.message === 'already exists') {
          next({ code: 400, message: 'Product tersebut sudah ada di dalam Carts' })
        } else if (err.message === 'stock zero') {
          next({ code: 400, message: 'Product stock tidak tersedia untuk sekarang'})
        } else next({ code: 500, message: 'Internal Server Error' })
      })
  }

  static removeToCart(req, res, next) {
    Cart.destroy({ where: { id: +req.params.id }})
      .then(() => {
        res.status(200).json({ message: "Cart's has been deleted" })
      })
      .catch((err) => {
        console.log(err)
        next({ code: 500, message: 'Internal Server Error'})
      })
  }

  static updateCart(req, res, next) {
    const operator = req.params.operator

    Cart.findOne({ where: { id: +req.params.id},
      include: [{
        model: Product
      }]
    })
      .then((data) => {
        let update = {}
        if (operator === 'plus') {
          update = {
            amount: data.amount + 1
          }
        } else if (operator === 'minus'){
          update = {
            amount: data.amount - 1
          }
        } else {
          throw new Error()
        }
        if (data.Product.stock <= data.amount && operator === 'plus') {
          throw new Error('stock over')
        } else if (update.amount <= 0 && operator === 'minus') {
          throw new Error('amount zero')
        } else return Cart.update(update, { where: { id: +req.params.id }}) 
      })
      .then(() => {
        if (operator === 'plus') {
          res.status(200).json({ message: 'Jumlah product dalam cart berhasil ditambahkan' })
        } else if (operator === 'minus') {
          res.status(200).json({ message: 'Jumlah product dalam cart berhasil dikurangi' })
        } else throw new Error('operator not found')
      })
      .catch((err) => {
        if (err.message === 'amount zero') {
          next({ code: 400, message: 'Jumlah cart tidak bisa dikurangi, silahkan klik tombol delete untuk membatalkan cart'})
        } else if (err.message === 'stock over') {
          next({ code: 400, message: 'Jumlah cart melebihi stock product, kurangi stock untuk dapat menambahkan product'})
        } else if (err.message === 'operator not found') {
          next({ code: 404, message: "Operator perhitungan tidak ditemukan"})
        } else {
          next({ code: 500, message: "Internal Server Error" })
        }
      })
  }

  static showCarts(req, res, next) {
    Cart.findAll({ where: {
       userId: +req.user.id 
      }, 
      include: [{
        model: Product
      }],
      order: [
        ['id', 'ASC']
      ]
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        next({ code: 500, message: 'Internal Server Error' })
      })
  }

  static checkoutProduct (req, res, next) {
    let flag = false

    Cart.findOne({ where: {
       id: +req.params.id
      }, include: [{
        model: Product
      }]})
      .then((data) => {
        if (data.Product.stock >= data.amount && data.amount > 0) {
          const reduceStock = {
            stock: data.Product.stock - data.amount
          }
          return Product.update(reduceStock, { where: { id: +data.Product.id}})
        } else if (data.Product.stock < data.amount) {
          const adjustAmount = {
            amount: data.Product.stock
          }
          flag = true
          return Cart.update(adjustAmount, { where: { id: +req.params.id }})
        }
      })
      .then(() => {
        if (flag) throw new Error('stock unavailable')
        else return Cart.destroy({where: { id: +req.params.id }})
      })
      .then((data) => {
        res.status(200).json({ data, message: "Product Stock berhasil di update (pengurangan) dan Cart telah dihapus" })
      })
      .catch((err) => {
        if (err.message === 'stock unavailable') {
          next({ code: 404, message: 'Jumlah Product melebihi stock, silahkan kurangi jumlahnya sesuai stock yang tersedia', from: 'costumer controller checkout' })
        } else if (err) {
          console.log(err)
          next({ code: 500, message: "Internal Server Error", from: "costumer controller checkout"})
        }
      })
  }
}

module.exports = CustomerController