const users = require('../../models/users')
const router = require('express').Router()
const {hashPassword,renderError,compareHash} = require('../utils')

router.route('/login')
  .get((request, response,) => {
    response.render('users/login', {title: 'Log In'})
  })
  .post((request, response, next) => {
    const user = {
      username: request.body.username,
      password: request.body.password
    }
    users.find(user.username)
    .then(response => compareHash(user.password, response[0].password))
    .then(match => {
      if(match){
        request.session.user = user
        response.redirect('/')
      } else {
        response.status(401).render('users/login', {title: 'Log In', warning: 'Invalid username or password'})
      }
    }).catch(error => next(error))
  })

router.get('/logout', (request, response) => {
  if(request.session){
    request.session.destroy(function(err){
      if(err) next(err)
      return response.redirect('/')
    })
  }
})

router.route('/signup')
  .get((request, response) => {
    response.render('users/signup', {title: 'Sign Up'})
  })
  .post((request, response, next) => {
    const { username, password } = request.body
    hashPassword(password)
    .then(hash => users.create({username: username, password: hash}))
    .then(user => {
      request.session.user = user
      response.redirect('/')
    })
    .catch(error => next(error))
  })

module.exports = router
