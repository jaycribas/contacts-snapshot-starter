const chai = require('chai')
const expect = chai.expect
const dbHelper = require('../helpers/db')
const app = require('../../src/server')

chai.use(require('chai-http'))

describe('http routes', () => {
  beforeEach('reset the DB', () => dbHelper.initDB())

  describe("'/' GET route", () => {

    it('should respond with a status 200', () => {
      return chai.request(app)
          .get('/')
          .then(res => {
            expect(res).to.have.status(200)
          })
          .catch(error => {
            throw error
          })
    })

    it('should contain "Jared","Tanner", "NeEddra"', () => {
      return chai.request(app)
          .get('/')
          .then(res => {
            expect(res.text).to.contain('Jared', 'Tanner', 'NeEddra')
          })
          .catch(error => {
            throw error
          })
    })
  })

  describe("'/contacts/new' GET route", () => {

    it('should respond with a status 200', () => {
      return chai.request(app)
          .get('/contacts/new')
          .then(res => {
            expect(res).to.have.status(200)
          })
    })

    it('should have response headers for content-type set to text/html', () => {
      return chai.request(app)
          .get('/contacts/new')
          .then(res => {
            expect(res).to.have.header('content-type', 'text/html; charset=utf-8')
          })
    })

    it('should respond with html', () => {
      return chai.request(app)
          .get('/contacts/new')
          .then(res => {
            expect(res).to.be.html
          })
    })
  })

  describe("'/contacts' POST route", () => {
    it('should respond with a status 200', () => {
      return chai.request(app)
          .post('/contacts')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({first_name: 'foo', last_name: 'bar'})
          .then(res => {
            expect(res).to.have.status(200)
            expect(res.text).to.contain('foo')
          })
    })
  })

  describe("'/contacts/:contactId' GET route", () => {
    it('should retrieve the correct contact', () => {
      return chai.request(app)
        .get('/contacts/1')
        .then(res => {
          expect(res.text).to.contain('Jared','Grippe')
          expect(res.text).to.not.contain('Tanner', 'NeEddra')
        })
    })
  })

  describe("'/contacts/:contactId' DELETE route", () => {
    it('should delete the contact with matching id', () => {
      return chai.request(app)
        .delete('/contacts/1')
        .then(res => {
          expect(res.text).to.contain('Tanner', 'NeEddra')
          expect(res.text).to.not.contain('Jared')
        })
    })
  })

  describe("'/search' GET route", () => {
    it('should return the correct contact search result', () => {
      return chai.request(app)
        .get('/contacts/search')
        .query({q: 'jared'})
        .then(res => {
          expect(res.text).to.contain('Jared', 'Grippe')
          expect(res.text).to.not.contain('Tanner', 'NeEddra')
        })
    })
  })

  describe("'/blah' - undefined GET route", () => {
    it('should return a status 404', () => {
      return chai.request(app)
          .get('/blah')
          .catch(res => {
            expect(res).to.have.status(404)
          })
    })
  })
})
