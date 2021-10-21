const express = require('express')
const router = express.Router() // express의 메서드
const book = require('./book')

router.use('/books', book)

module.exports = router
