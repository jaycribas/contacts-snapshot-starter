const users = require('../../models/users')
const router = require('express').Router()

router.route('/')
  .get((request, response, next) => {
    response.render('auth/login')
  })
  .post((request, response) => {
    const { username, password } = request.body

    users.find(username)
    .then(user => {
      if(username === user[0].username && password === user[0].password){
        response.redirect('/')
      } else {
        response.render('auth/login', {warning: 'Invalid username or password'})
      }
    })
    .catch(error => next(error))
  })

module.exports = router
