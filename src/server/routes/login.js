const users = require('../../models/users')
const router = require('express').Router()
const middlewares = require('../middlewares')
const bcrypt = require('bcrypt');

router.route('/')

  .get((request, response,) => {
    response.render('auth/login', {warning: ''})
  })

  .post((request, response, next) => {
    const { username, password } = request.body
    users.find(username)
    .then(user => {
      bcrypt.compare(password, user[0].password, function(err, res) {
        if(res) {
          request.session.user = user
          response.redirect('/')
        } else {
         response.render('auth/login', {warning: 'Invalid username or password'})
        }
      })
    }).catch(error => next(error))
  })

module.exports = router
