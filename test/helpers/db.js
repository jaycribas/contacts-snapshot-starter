process.env.DATABASE_URL='postgres://localhost:5432/contacts_test'
const db = require('../../src/models/db/db')
const QueryFile = require('pg-promise').QueryFile
const path = require('path')

function sql(file){
  const fullPath = path.join(__dirname, file)
  return new QueryFile(fullPath)
}

const seedFiles = {contacts: sql('../seed/contacts.sql')}

const truncateTables = () => {
  const tables = ['contacts']
  return Promise.all(tables.map(table => db.none(`TRUNCATE ${table} RESTART IDENTITY`)))
}

const seedTables = () => db.none(seedFiles.contacts)

const initDB = () => truncateTables().then(() => seedTables())

module.exports = { initDB }
