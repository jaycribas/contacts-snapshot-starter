const router = require('express').Router();
const contactsRoutes = require('./contacts')
const usersRoutes = require('./users')
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');

router.get('/', middlewares.sessionChecker, (request, response, next) => {
  contacts.findAll()
    .then((contacts) => {response.render('contacts/index', { contacts })})
    .catch( error => next(error) )
})

router.use('/', usersRoutes)

router.all('*', middlewares.sessionChecker)

router.use('/contacts', contactsRoutes);


router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

module.exports = router;
