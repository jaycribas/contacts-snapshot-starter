const users = require('../../models/users')
const router = require('express').Router()
const bcrypt = require('bcrypt')

router.route('/')
  .get((request, response) => {
    response.render('auth/signup')
  })
  .post((request, response, next) => {
    bcrypt.hash(request.body.password, 10, function(err, hash) {
      request.body.password = hash
      users.create(request.body)
      .then(user => {
        request.session.user = user
        response.redirect('/')
      })
      .catch(error => next(error))
    })
  })

module.exports = router
