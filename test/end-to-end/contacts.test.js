const chai = require('chai')
const expect = chai.expect
const dbHelper = require('../helpers/db')

chai.use(require('chai-http'))

// describe('demo', () => {
//   beforeEach('reset the DB', () => {
//     return dbHelper.initDB()
//   })
//
//   it('should do a thing', () => {
//     expect(true).to.equal(false)
//   })
//   it('should do a thing', () => {
//     expect(true).to.equal(false)
//   })
//   it('should do a thing', () => {
//     expect(true).to.equal(false)
//   })
// })
