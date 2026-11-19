const { Router } = require('express');
const logService = require('./log.service');

const router = Router();

router.post('/', logService.insertLog);

module.exports = router;
