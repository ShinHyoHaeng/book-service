const express = require('express')
const bookRouter = express.Router()
const Book = require("../../models/book")

// 전체 도서 조회
bookRouter.get('/', async (req, res) => {
    const books = await Book.find()
    console.log(books)
    res.json({status:200, books})
})

// 특정 도서 조회
bookRouter.get('/:id', (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) throw err;
        res.json({status:200, book})
    })
})

// 신규 도서 생성
bookRouter.post('/', (req, res) => {
    console.log(`ISBN: ${req.body.ISBN}`)
    Book.findOne({ISBN: req.body.ISBN}, async(err, book) => { // isbn 중복 체크
        if(err) throw err;
        if(!book){
            const newBook = new Book(req.body);
            await newBook.save().then(() => {
                res.json({status:201, msg: '새로운 도서가 DB에 추가되었습니다.', newBook})
            })
        }else{
            const msg = '해당 도서가 이미 DB에 존재합니다'
            console.log(msg)
            res.json({status:204, msg})
        }
   })
})

// 특정 도서 수정
bookRouter.put('/:id',(req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, book) => {
        if(err) throw err;
        res.json({status:204, msg:`해당 도서(id:${req.params.id})의 정보가 수정되었습니다.`, book})
    })
})

// 특정 도서 삭제
bookRouter.delete('/:id', (req, res) =>{
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if(err) throw err;
        res.json({status:204, msg:`해당 도서(id: ${req.params.id})를 DB에서 삭제하였습니다.`})
    })
})

module.exports = bookRouter