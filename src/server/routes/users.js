const users = require('../../models/users')
const router = require('express').Router()
const middlewares = require('../middlewares')
const bcrypt = require('bcrypt');

router.route('/login')
  .get((request, response,) => {
    response.render('users/login', {warning: ''})
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
         response.render('users/login', {warning: 'Invalid username or password'})
        }
      })
    }).catch(error => next(error))
  })

router.route('/signup')
  .get((request, response) => {
    response.render('users/signup')
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
