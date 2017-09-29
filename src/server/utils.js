const bcrypt = require('bcrypt')

const hashPassword = function(plainTextPassword){
  return bcrypt.hash(plainTextPassword, 10)
}

const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

module.exports = {hashPassword,renderError}
