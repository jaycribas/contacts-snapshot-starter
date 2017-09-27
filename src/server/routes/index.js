const router = require('express').Router();
const contactsRoutes = require('./contacts')
const loginRoute = require('./login')
const signUpRoute = require('./signup')
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');

router.get('/', (request, response, next) => {
  contacts.findAll()
    .then((contacts) => {response.render('contacts/index', { contacts })})
    .catch( error => next(error) )
})

router.use('/contacts', contactsRoutes);
router.use('/login', loginRoute)
router.use('/signup', signUpRoute)

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

module.exports = router;
