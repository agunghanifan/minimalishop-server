const request = require("supertest")
const app = require("../app")
const deleteProduct = require("../helpers/destroy-products")
let access_token = ""
let idEdit = 0

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
        const headers = {
          access_token
        }
        const body = {
          name: "Sepatu Jordan 2",
          image_url: "https://www.whatproswear.com/wp-content/uploads/2019/03/IMG_6794-1024x1024.jpg",
          price: 10000,
          stock: 100,
        }
        request(app)
          .post("/addproduct")
          .set(headers)
          .send(body)
          .end(function (err, res) {
            if (err) {
              done(err)
            } else {
              idEdit = res.body.id
              done()
            }
          })
      }
    })
})


describe("testing update product PUT /product/:id ", function () {

  it("should return success response with status code 201", function (done) {
    //setup
    const headers = {
      access_token
    }
    const body = {
      name: "Sepatu Bata",
      image_url: "https://ds393qgzrxwzn.cloudfront.net/resize/m400x400/cat1/img/images/0/DjMfj7kBLg.jpg",
      price: 10000,
      stock: 50,
      CategoryId: 2,
    }
    //execute
    request(app)
      .put(`/product/${idEdit}`)
      .set(headers)
      .send(body)
      .end(function (err, res) {
        if(err) {
          done(err)
        } else {
          //assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual(
            expect.stringContaining(`Update Success id ${idEdit}`)
          )
          done()
        }
      })
  })


  // case access_token undefined or null
  it("should return response with status code 401 (tidak menyertakan access_token)", function (done) {
    //setup
    const headers = {
      access_token: ""
    }
    const body = {
      name: "Sepatu Bata",
      image_url: "https://ds393qgzrxwzn.cloudfront.net/resize/m400x400/cat1/img/images/0/DjMfj7kBLg.jpg",
      price: 100000,
      stock: 100,
      CategoryId: 2,
    }
    request(app)
      .put(`/product/${idEdit}`)
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

  // mengecek access_token masuk role admin atau bukan
  it("should return response with status code 401 (access_token bukan role admin)", function (done) {
    //setup
    const headers = {
      access_token: "dshjfhsdjah89278348237"
    }
    const body = {
      name: "Sepatu Bata",
      image_url: "https://ds393qgzrxwzn.cloudfront.net/resize/m400x400/cat1/img/images/0/DjMfj7kBLg.jpg",
      price: 100000,
      stock: 10,
      CategoryId: 2,
    }
    //execute
    request(app)
      .put(`/product/${idEdit}`)
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

  // mengecek jika stock diisi angka minus
  it("should return response with status code 400 (stock diisi angka minus)", function (done) {
    //setup
    const headers = {
      access_token
    }
    const body = {
      name: "Sepatu Puma",
      image_url: "https://ncrsport.com/img/storage/large/352634-03-1.jpg",
      price: 100000,
      stock: -10,
      CategoryId: 2,
    }
    //execute
    request(app)
      .put(`/product/${idEdit}`)
      .set(headers)
      .send(body)
      .end(function (err, res) {
        if(err) {
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

  // field diisi data yang tidak sesuai
  it("should return response with status code 400 (stock diisi string)", function (done) {
    //setup
    const headers = {
      access_token
    }
    const body = {
      name: "Sepatu Puma",
      image_url: "https://ncrsport.com/img/storage/large/352634-03-1.jpg",
      price: 100000,
      stock: "balalala",
      CategoryId: 2,
    }
    //execute
    request(app)
      .put(`/product/${idEdit}`)
      .set(headers)
      .send(body)
      .end(function (err, res) {
        //assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("message")
        expect(typeof res.body.message).toEqual("object")
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Stock format is Number / Integer"])
        )
        done()
      })
  })
})
