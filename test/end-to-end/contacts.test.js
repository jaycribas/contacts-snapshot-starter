const chai = require('chai')
const expect = chai.expect
const dbHelper = require('../helpers/db')
const app = require('../../src/server')

chai.use(require('chai-http'))

describe('http routes', () => {
  beforeEach('reset the DB', () => dbHelper.initDB())

  describe("'/' GET route", () => {

    it('should respond with a status 200', () => {
      chai.request(app)
          .get('/')
          .then(res => {
            expect(res).to.have.status(200)
          })
          .catch(error => {
            throw error
          })
    })

    it('should contain "Jared","Tanner", "NeEddra"', () => {
      chai.request(app)
          .get('/')
          .then(res => {
            expect(res.text).to.contain('Jared','Tanner', 'NeEddra')
          })
          .catch(error => {
            throw error
          })
    })
  })

  describe("'/contacts/new' GET route", () => {

    it('should respond with a status 200', () => {
      chai.request(app)
          .get('/contacts/new')
          .then(res => {
            expect(res).to.have.status(200)
          })
          .catch(error => {
            throw error
          })
    })

    it('should have response headers for content-type set to text/html', () => {
      chai.request(app)
          .get('/contacts/new')
          .then(res => {
            expect(res).to.have.header('content-type', 'text/html; charset=utf-8')
          })
          .catch(error => {
            throw error
          })
    })

    it('should respond with html', () => {
      chai.request(app)
          .get('/contacts/new')
          .then(res => {
            expect(res).to.be.html
          })
          .catch(error => {
            throw error
          })
    })
  })

  describe("'/blah' - undefined GET route", () => {
    it('should return a status 404', () => {
      chai.request(app)
          .get('/blah')
          .then(res => {
            expect(res).to.have.status(404)
          })
          .catch(error => {
            throw error
          })
    })
  })
})
