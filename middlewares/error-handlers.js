const errorHandler = (err, req, res, next) => {
    if (err.code == 400) {
      console.log(err.from)
      res.status(err.code).json({message: err.message})
    } else if (err.code === 401) {
      console.log(err.from)
      res.status(err.code).json({message: err.message})
    } else {
      console.log(err.from)
      res.status(err.code).json({message: err.message})
    }
}

module.exports = errorHandler