const { Router } = require('express');
const documentTypeRouter = require('./docTypes');
const usersRouter = require('./users');

const userStatusRouter = require('./userStatus');

const router = Router();


// Routers
router.use('/users', usersRouter)
router.use('/docTypes', documentTypeRouter )
router.use('/usersStatus', userStatusRouter)

module.exports = router;
