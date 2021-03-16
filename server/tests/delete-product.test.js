const request = require("supertest")
const app = require("../app")
const deleteProduct = require("../helpers/destroy-products")
let idProduct = 0
let access_token = ""

beforeAll(function (done) {
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
        const headers = {
          access_token
        }
        const body = {
          name: "Sepatu Jordan 3",
          image_url: "https://www.whatproswear.com/wp-content/uploads/2019/03/IMG_6794-1024x1024.jpg",
          price: 1000,
          stock: 10,
        }
        request(app)
          .post("/addproduct")
          .set(headers)
          .send(body)
          .end(function (err, res) {
            if (err) {
              done(err)
            } else {
              idProduct = res.body.id
              done()
            }
          })
      }
    })
})

afterAll(function (done) {
  // delete table pada database env test
  deleteProduct()
    .then(() => done())
    .catch(done)
})

describe("testing delete product DELETE /product/:id", function () {
  //success delete product
  it("should return success response with status code 200", function (done) {
    //setup
    const headers = {
      access_token
    }
    //execute
    request(app)
      .delete(`/product/${idProduct}`)
      .set(headers)
      .end(function (err, res) {
        if(err) {
          done(err)
        } else {
          //assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(typeof res.body.message).toEqual("string")
          expect(res.body.message).toEqual(
            expect.stringContaining(`Success delete id ${idProduct}`)
          )
          done()
        }
      })
  })

  //delete data tanpa menyertakan access_token
  it("should return response with status code 401 (access_token null or undefined)", function (done) {
    //setup
    const headers = {
      access_token: ""
    }
    //execute
    request(app)
      .delete(`/product/${idProduct}`)
      .set(headers)
      .end(function (err, res) {
        if(err) {
          done(err)
        } else {
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

  // delete data dengan menyertakan access_token bukan role admin
  it("should return response with status code 401 (access_token role not admin)", function (done) {
    //setup
    const headers = {
      access_token: "dshjfhsdjah89278348237"
    }
    //execute
    request(app)
      .delete(`/product/${idProduct}`)
      .set(headers)
      .end(function (err, res) {
        if(err) {
          done(err)
        } else {
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
})