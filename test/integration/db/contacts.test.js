const expect = require('chai').expect
const dbHelper = require('../../helpers/db')
const contacts = require('../../../src/models/contacts.js')

describe('contacts.js', () => {
  beforeEach('reset the DB', () => {
    return dbHelper.initDB()
  })

  describe('create', () => {
    it('should create a new contact', () => {
      let contact = { first_name: 'foo', last_name: 'bar' }
      return contacts.create(contact)
      .then(result => {
        expect(result[0]).to.be.an('object').that.has.all.keys(['id', 'first_name', 'last_name'])
        expect(result[0].first_name).to.equal('foo')
      })
    })
  })

})
