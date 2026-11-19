const { Router } = require('express');
const collectionService = require('./collection.service');

const router = Router();

router.post('/books', collectionService.createBooksCollection);
router.post('/authors', collectionService.createAuthorsCollection);
router.post('/logs/capped', collectionService.createLogsCappedCollection);
router.post('/books/index', collectionService.createBooksTitleIndex);

module.exports = router;
