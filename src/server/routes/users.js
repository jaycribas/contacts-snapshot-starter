const db = require('../../models/users')
const router = require('express').Router()
const {hashPassword,renderError,compareHash} = require('../utils')

router.route('/login')
  .get((request, response,) => {
    response.render('users/login', {warning: ''})
  })
  .post((request, response, next) => {
    const user = {
      username: request.body.username,
      password: request.body.password
    }
    db.find(user.username)
    .then(response => compareHash(user.password, response[0].password))
    .then(match => {
      if(match){
        request.session.user = user
        response.redirect('/')
      } else {
        response.render('users/login', {warning: 'Invalid username or password'})
      }
    }).catch(error => next(error))
  })

router.route('/signup')
  .get((request, response) => {
    response.render('users/signup')
  })
  .post((request, response, next) => {
    const { username, password } = request.body
    hashPassword(password)
    .then(hash => db.create({username: username, password: hash}))
    .then(user => {
      request.session.user = user
      response.redirect('/')
    })
    .catch(error => next(error))
  })

module.exports = router
