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
      .then(newContact => {
        expect(newContact[0]).to.be.an('object').that.has.all.keys(['id', 'first_name', 'last_name'])
        expect(newContact[0].first_name).to.equal('foo')
      })
    })
  })

  describe('findAll', () => {
    it('should return all contacts', () => {
      return contacts.findAll()
      .then(allContacts => {
        expect(allContacts).to.be.an('array').to.have.a.lengthOf(3)
      })
    })
  })

  describe('findById', () => {
    it('should return a single contacts with matching id', () => {
      return contacts.findById(1)
      .then(contact => {
        expect(contact).to.be.an('object')
        expect(contact.first_name).to.equal('Jared')
      })
    })
  })

})
