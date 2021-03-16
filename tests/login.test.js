const request = require("supertest")
const app = require("../app")

// testing POST /login routes to login admin to the website
describe("testing POST /login", function () {
  it("should return success response with status code 200", function (done) {
    //setup
    const body = {
      email: "admin@mail.com",
      password: "admin123",
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
          expect(res.body).toHaveProperty("role")
          expect(typeof res.body.role).toEqual("string")
          expect(res.body).toHaveProperty("email")
          expect(typeof res.body.email).toEqual("string")
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
  it("should return response with status code 404 (password salah)", function (done) {
    //setup
    const body = {
      email: "admin@mail.com",
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
          expect(res.statusCode).toEqual(404)
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
  it("should return response with status code 404 (email tidak ada di DB)", function (done) {
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
          expect(res.statusCode).toEqual(404)
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