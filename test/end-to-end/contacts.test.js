const chai = require('chai')
const expect = chai.expect
const dbHelper = require('../helpers/db')
const app = require('../../src/server')

chai.use(require('chai-http'))

describe('http routes', () => {
  beforeEach('reset the DB', () => dbHelper.initDB())

  describe("'/' GET route", () => {

    it('responds with a status 200', (done) => {
      chai.request(app)
          .get('/')
          .end((err,res) => {
            if(err) console.log("err (╯°□°）╯︵ ┻━┻", err)
            expect(res).to.have.status(200)
            done()
          })
    })

    it('should contain "Jared","Tanner", "NeEddra"', (done) => {
      chai.request(app)
          .get('/')
          .end((err,res) => {
            if(err) console.log("err (╯°□°）╯︵ ┻━┻", err)
            expect(res.text).to.contain('Jared','Tanner', 'NeEddra')
            done()
          })
    })
  })

  describe("'/blah' - undefined GET route", () => {
    it('should return a status 404', (done) => {
      chai.request(app)
          .get('/blah')
          .end(res => {
            expect(res).to.have.status(404)
            done()
          })
    })

  })
})
