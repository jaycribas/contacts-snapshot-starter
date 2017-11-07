const router = require('express').Router()
const contactsRoutes = require('./contacts')
const usersRoutes = require('./users')
const contacts = require('../../models/contacts')
const middlewares = require('../middlewares')
const session = require('express-session')

router.use(session({
  key: 'user_sid',
  secret: 'shhh secrets',
  resave: false,
  saveUninitialized: false
}))

router.get('/', middlewares.sessionChecker, (request, response, next) => {
  contacts.findAll()
    .then((contacts) => response.render('contacts/index', {title: 'Welcome', contacts }))
    .catch( error => next(error) )
})

router.use('/', usersRoutes)

router.use(middlewares.sessionChecker)

router.use('/contacts', contactsRoutes)

router.use(middlewares.logErrors)
router.use(middlewares.errorHandler)
router.use(middlewares.notFoundHandler)

module.exports = router
