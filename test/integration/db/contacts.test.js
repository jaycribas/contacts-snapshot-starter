const expect = require('chai').expect
const dbHelper = require('../../helpers/db')

describe('demo', () => {
  beforeEach('reset the DB', () => {
    return dbHelper.initDB()
  })

  it('should do a thing', () => {
    expect(true).to.equal(false)
  })
  it('should do a thing', () => {
    expect(true).to.equal(false)
  })
  it('should do a thing', () => {
    expect(true).to.equal(false)
  })
})
