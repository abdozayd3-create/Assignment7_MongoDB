const { Router } = require('express');
const bookService = require('./book.service');

const router = Router();

router.post('/', bookService.insertOneBook);
router.post('/batch', bookService.insertBatchBooks);
router.patch('/:title', bookService.updateBookYearByTitle);
router.get('/title', bookService.findBookByTitle);
router.get('/year', bookService.findBooksByYearRange);
router.get('/genre', bookService.findBooksByGenre);
router.get('/skip-limit', bookService.getBooksSkipLimit);
router.get('/year-integer', bookService.getBooksYearInteger);
router.get('/exclude-genres', bookService.getBooksExcludeGenres);
router.delete('/before-year', bookService.deleteBooksBeforeYear);
router.get('/aggregate1', bookService.aggregate1);
router.get('/aggregate2', bookService.aggregate2);
router.get('/aggregate3', bookService.aggregate3);
router.get('/aggregate4', bookService.aggregate4);

module.exports = router;
