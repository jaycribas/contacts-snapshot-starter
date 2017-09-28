const users = require('../../models/users')
const router = require('express').Router()

router.route('/')
  .get((request, response) => {
    response.render('auth/signup')
  })
  .post((request, response, next) => {
    console.log("request.body (╯°□°）╯︵ ┻━┻", request.body)
    users.create(request.body)
    .then(user => {
      request.session.user = user
      response.redirect('/')
    })
    .catch(error => next(error))
  })

module.exports = router
