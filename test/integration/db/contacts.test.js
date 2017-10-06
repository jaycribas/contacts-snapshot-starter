const expect = require('chai').expect
const dbHelper = require('../../helpers/db')
const contacts = require('../../../src/models/contacts.js')

describe('db functions contacts.js', () => {
  beforeEach('reset the DB', () => {
    return dbHelper.initDB()
  })

  describe('create', () => {
    it('should create a new contact', () => {
      let contact = { first_name: 'foo', last_name: 'bar' }
      return contacts.create(contact)
      .then(newContact => {
        expect(newContact[0]).to.be.an('object').that.has.all.keys(['id', 'first_name', 'last_name'])
        expect(newContact[0].first_name).to.equal('foo')})
    })
  })

  describe('findAll', () => {
    it('should return all contacts', () => {
      return contacts.findAll()
      .then(allContacts => {
        expect(allContacts).to.be.an('array').to.have.a.lengthOf(3)})
    })
  })

  describe('findById', () => {
    it('should return a single contacts with matching id', () => {
      return contacts.findById(1)
      .then(contact => {
        expect(contact).to.be.an('object')
        expect(contact.first_name).to.equal('Jared')})
    })
  })

  describe('destroy', () => {
    it('should return all contacts', () => {
      return contacts.destroy(1)
      .then(() => {
        return contacts.findAll()
        .then(allContacts => {
          expect(allContacts).to.be.an('array').to.have.a.lengthOf(2)})
      })
    })
  })

  describe('search', () => {
    it('should return the contact Jared', () => {
      return contacts.search('jar')
      .then(searchResults => {
        expect(searchResults).to.be.an('array').to.have.a.lengthOf(1)
        expect(searchResults[0].first_name).to.equal('Jared')
      })
    })
  })

})
