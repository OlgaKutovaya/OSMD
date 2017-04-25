const router = require('express').Router();

router.use('/users', require('./admin-users-router'));
router.use('/categories', require('./admin-categories-router'));
router.use('/subcategories', require('./admin-subcategories.router'));
router.use('/documents', require('./admin-documents-router'));

module.exports = router;
