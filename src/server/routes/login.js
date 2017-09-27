const users = require('../../models/users')
const router = require('express').Router()

router.get('/', (request, response) => {
  response.render('auth/login')
})

module.exports = router
