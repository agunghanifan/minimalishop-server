const request = require("supertest")
const app = require("../app")
const jwt = require("jsonwebtoken")

// get access token to testing
beforeAll(function () {
  const access_token = jwt.sign({ id: 10, name: "admins", email: "emails@mail.com" }, process.env.JWT_SECRET_TEST)
  return access_token
})

// testing POST /login routes to login admin to the website
describe("testing POST /login", function () {
  it("should return success response with status code 200", function (done) {
    //setup
    const body = {
      email: "testing@mail.com",
      password: "dsfjsdua"
    }
    //execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if(err) {
          done(err)
        } else {
          //assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("id")
          expect(typeof res.body.id).toEqual("number")
          expect(res.body).toHaveProperty("name")
          expect(typeof res.body.name).toEqual("string")
          expect(res.body).toHaveProperty("email")
          expect(typeof res.body.id).toEqual("string")
          expect(res.body).toHaveProperty("access_token")
          expect(typeof res.body.access_token).toEqual("string")
          done()
        }
      })
  })

  // tidak mengisi email dan password
  it("should return success response with status code 400 (email dan password tidak diisi)", function (done) {
    //setup
    const body = {
      email: "",
      password: ""
    }
    //execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if(err) {
          done(err)
        } else {
          //assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual(
            expect.stringContaining("Email / Password wajib diisi")
          )
          done()
        }
      })
  })

  // password salah
  it("should return response with status code 400 (password salah)", function (done) {
    //setup
    const body = {
      email: "testing@mail.com",
      password: "12345"
    }
    //execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if(err) {
          done(err)
        } else {
          //assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual(
            expect.stringContaining("Email / Password is wrong, try again.")
          )
          done()
        }
      })
  })

  // email tidak ada di DB
  it("should return response with status code 400", function (done) {
    //setup
    const body = {
      email: "testing123@mail.com",
      password: "12345"
    }
    //execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if(err) {
          done(err)
        } else {
          //assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual(
            expect.stringContaining("Email / Password is wrong, try again.")
          )
          done()
        }
      })
  })
})


// testing POST /addproduct to add new object product to database
describe("testing POST /addproduct", function () {
  it("should return success response with status code 201", function (done) {
    //setup
    const headers = {
      access_token
    }
    const body = {
      name: "name",
      image_url: "image_url",
      price: 10000,
      stock: 100,
      CategoryId: 1
    }
    //execute
    request(app)
      .post("/addproduct")
      .set(headers)
      .send(body)
      .end(function (err, res) {
        if (err) {
          done(err)
        } else {
          //assert
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("id")
          expect(typeof res.body.id).toEqual("number")
          expect(res.body).toHaveProperty("name", body.name)
          expect(res.body.name).toEqual("string")
          expect(res.body).toHaveProperty("image_url", body.image_url)
          expect(res.body.name).toEqual("string")
          expect(res.body).toHaveProperty("price", body.price)
          expect(res.body.price).toEqual("number")
          expect(res.body).toHaveProperty("stock", body.stock)
          expect(res.body.stock).toEqual("number")
          expect(res.body).toHaveProperty("CategoryId", body.CategoryId)
          expect(res.body.CategoryId).toEqual("number")
          done()
        }
      })
  })

  // tidak menyertakan access_token
  it("should return response with status code 401 (access_token tidak ditemukan)", function (done) {
    //setup
    const headers = {
      access_token: ""
    }
    const body = {
      name: "name",
      image_url: "image_url",
      price: 10000,
      stock: 100,
      CategoryId: 1
    }
    //execute
    request(app)
      .post("/addproduct")
      .set(headers)
      .send(body)
      .end(function (err, res) {
        if(err) {
          done(err)
        } else {
          //assert
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body.name).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual(
            expect.stringContaining("Unauthorize User")
          )
          done()
        }
      })
  })

  // memiliki access_token namun bukan admin
  it("should return response with status code 401 (access_token bukan admin)", function (done) {
    //setup
    const headers = {
      access_token: "sjfdlkfj09890sfaf"
    }
    const body = {
      name: "name string",
      image_url: "image_url string",
      price: 10000,
      stock: 100,
      CategoryId: 1
    }
    //execute
    request(app)
      .post("/addproduct")
      .set(headers)
      .send(body)
      .end(function (err, res) {
        if(err) {
          done(err)
        } else {
          //assert
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body.name).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual(
            expect.stringContaining("Unauthorize User")
          )
          done()
        }
      })
  })
})
