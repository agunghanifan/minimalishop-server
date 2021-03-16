const request = require("supertest")
const app = require("../app")
let access_token = ""

beforeAll(function (done) {
  // login to database test env for get access_token
    const body = {
      email: "admin@mail.com",
      password: "admin123",
    }
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if (err) {
          done(err)
        } else {
          // get access_token for authentication
          access_token = res.body.access_token
          console.log(access_token, "ini access token dari before all")
          done()
        }
      })
})

// testing POST /addproduct to add new object product to database
describe("testing POST /addproduct", function () {

  it("should return success response with status code 201", function (done) {
    //setup
    console.log("masuk 201 testing")
    console.log(access_token)
    const headers = {
      access_token
    }
    const body = {
      name: "Sepatu Jordan",
      image_url: "https://www.whatproswear.com/wp-content/uploads/2019/03/IMG_6794-1024x1024.jpg",
      price: 10000,
      stock: 100,
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
          expect(typeof res.body.name).toEqual("string")
          expect(res.body).toHaveProperty("image_url", body.image_url)
          expect(typeof res.body.name).toEqual("string")
          expect(res.body).toHaveProperty("price", body.price)
          expect(typeof res.body.price).toEqual("number")
          expect(res.body).toHaveProperty("stock", body.stock)
          expect(typeof res.body.stock).toEqual("number")
          expect(res.body).toHaveProperty("CategoryId", 1) //hooks membuat default product dimasukkan ke category id 1
          expect(typeof res.body.CategoryId).toEqual("number")
          done()
        }
      })
  })

  // tidak menyertakan access_token
  it("should return response with status code 401 (access_token tidak ditemukan)", function (done) {
    console.log("masuk 401 testing no token")
    console.log(access_token)
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
        if (err) {
          done(err)
        } else {
          //assert
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
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
    console.log("masuk 401 testing bukan admin")
    console.log(access_token)
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
        if (err) {
          done(err)
        } else {
          //assert
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual(
            expect.stringContaining("Unauthorize User")
          )
          done()
        }
      })
  })

  // field required tidak diisi
  it("should return response with status code 400 (ada field yang tidak diisi)", function (done) {
    console.log("masuk 400 ada field kosong")
    console.log(access_token)
    //setup
    const headers = {
      access_token
    }
    const body = {
      name: "",
      image_url: "",
      price: null,
      stock: null,
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
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(Array.isArray(res.body.message)).toEqual(true)
          expect(res.body.message).toEqual(
            expect.arrayContaining(["Name is required", "Image Url is required for product display purposes", "Price is required", "Stock is required"])
          )
          done()
        }
      })
  })

  // stock diisi angka minus
  it("should return response with status code 400 (stock tidak boleh minus)", function (done) {
    console.log("masuk 400 ada stock minus")
    console.log(access_token)
    //setup
    const headers = {
      access_token
    }
    const body = {
      name: "name string",
      image_url: "image_url string",
      price: 10000,
      stock: -1,
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
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(typeof res.body.message).toEqual("object")
          expect(res.body.message).toEqual(
            expect.arrayContaining(["Stock must be Negative and the value is above from 0"])
          )
          done()
        }
      })
  })

  // price tidak boleh minus
  it("should return response with status code 400 (price tidak boleh minus)", function (done) {
    console.log("masuk 400 ada price minus")
    console.log(access_token)
    //setup
    const headers = {
      access_token
    }
    const body = {
      name: "name string",
      image_url: "image_url string",
      price: -1,
      stock: 10,
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
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(typeof res.body.message).toEqual("object")
          expect(res.body.message).toEqual(
            expect.arrayContaining(["Price must be Positive and the value is above from 0"])
          )
          done()
        }
      })
  })

  // stock harus number
  it("should return response with status code 400 (stock harus number)", function (done) {
    console.log("masuk 400 ada stock string")
    console.log(access_token)
    //setup
    const headers = {
      access_token
    }
    const body = {
      name: "name string",
      image_url: "image_url string",
      price: 10,
      stock: "balalala",
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
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(typeof res.body.message).toEqual("object")
          expect(res.body.message).toEqual(
            expect.arrayContaining(["Stock format is Number / Integer"])
          )
          done()
        }
      })
  })
})