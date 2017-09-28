const db = require('./db/users')

module.exports = {
  create: db.create,
  find: db.find
}
