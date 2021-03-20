const { User, Product, Category, Banner } = require("../models")

class ControllerBanner {

  static showBanner (req, res, next) {
    Banner.findAll({
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
        next({code: 500, message: "Internal Server Error", from: "showBanner controller"})
      })
  }

  static addBanner (req, res, next) {
    const body = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url,
      CategoryId: req.body.CategoryId,
    }
    Banner.create(body)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        let errors = []
        if (err.errors.length) {
          err.errors.forEach((error) => {
            errors.push(error.message)
          })
          next({code: 400, message: errors, from: "addBanner controller"})
        } else if (err.message) {
          next({code: 400, message: err.message, from: "addBanner controller"})
        } else {
          next({code: 500, message: "Internal Server Error", from: "showBanner controller"})
        }
      })
  }

  static showEditbanner (req, res, next) {
    const idBanner = +req.params.id
    Banner.findOne({ where: { id: idBanner }})
      .then((data) => {
        if (data) {
          res.status(200).json(data)
        } else {
          next({code: 404, message: "Data not found"})
        }
      })
      .catch((err) => {
        if (err) {
          next({code: 404, message: "Data not found"})
        } else {
          next({code: 500, message: "Internal Message Error"})
        }
      })
  }

  static editBanner (req, res, next) {
    const idBanner = +req.params.id
    const body = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url,
      CategoryId: req.body.CategoryId,
    }
    Banner.update(body, { where: { id: idBanner }})
      .then((data) => {
        if (data) {
          res.status(200).json(data)
        } else {
          next({code: 404, message: "Data not found"})
        }
      })
      .catch((err) => {
        console.log(err)
        if (err.errors.length) {
          let errors = []
          err.errors.forEach((error) => {
            errors.push(error.message)
          })
          next({code: 400, message: errors, from: "editBanner controller"})
        } else if (err.message) {
          next({code: 400, message: err.message, from: "editBanner controller"})
        } else {
          next({code: 500, message: "Internal Server Error", from: "editbannersubmit controller"})
        }
      })
  }

  static deleteBanner (req, res, next) {
    const idBanner = +req.params.id
    Banner.destroy({ where: { id: idBanner }})
      .then((data) => {
        if (data) {
          res.status(200).json(data)
        } else {
          next({code: 404, message: "Data not found", from: "deletebanner controller"})
        }
      })
      .catch((err) => {
        console.log(err)
        if (err) {
          next({code: 404, message: "Data not found", from: "deletebanner controller"})
        } else {
          next({code: 500, message: "Internal Server Error", from: "deletebanner controller"})
        }
      })
  }
}

module.exports = ControllerBanner