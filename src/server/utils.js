const bcrypt = require('bcrypt')

const hashPassword = function(plainTextPassword){
  return bcrypt.hash(plainTextPassword, 10)
}

const compareHash = function(plainTextPassword, hash){
  return bcrypt.compare(plainTextPassword, hash)
}

const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

module.exports = {hashPassword,renderError,compareHash}
