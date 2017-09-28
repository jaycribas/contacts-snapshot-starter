const users = require('../../models/users')
const router = require('express').Router()

router.get('/', (request, response, next) => {
  response.render('auth/signup')
})

module.exports = router
